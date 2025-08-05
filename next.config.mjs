/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds
      static: 180, // 3 minutes
    },
    serverExternalPackages: [
      'express',
      '@payloadcms/bundler-webpack',
      '@swc/core',
      'esbuild',
      'payload'
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  transpilePackages: [
    'payload',
    '@payloadcms/bundler-webpack',
    '@payloadcms/next-payload'
  ],
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    return process.env.GIT_HASH || `build-${Date.now()}`
  },
  webpack: (config, { isServer }) => {
    // Ignore .d.ts files
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    })

    // Externalize payload for server bundle
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          payload: 'payload',
          express: 'express',
        }
      ]
    }

    return config
  },
}

export default nextConfig