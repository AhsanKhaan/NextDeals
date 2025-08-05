import { getPayload, type Payload } from 'payload'
import type { InitOptions } from 'payload/config'
import payloadConfig from '../payload.config'

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is missing')
}

declare global {
  var payload: {
    client: Payload | null
    promise: Promise<Payload> | null
  }
}

let cached = global.payload

if (!cached) {
  cached = global.payload = { client: null, promise: null }
}

export const getPayloadClient = async (initOptions?: Partial<InitOptions>): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required')
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({
      config: payloadConfig,
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...initOptions,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}