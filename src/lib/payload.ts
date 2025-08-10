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

  if (process.env.ENV === 'dev') {

    // Bypass cache in dev mode
    const freshPayload = await getPayload({
      config: payloadConfig,
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...initOptions,
    }).then((payload) => {

      console.log('Fresh payload collections:', Object.keys(payload.collections))
      return payload
    })
    return freshPayload

  } else if (!cached.promise) {

    cached.promise = getPayload({
      config: payloadConfig,
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...initOptions,
    }).then((payload) => {
      console.log('Payload initialized with collections:', Object.keys(payload.collections)) // Add this
      return payload
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