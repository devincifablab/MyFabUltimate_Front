/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  }
  
  module.exports = nextConfig

  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })
  
  module.exports = withBundleAnalyzer({})

  module.exports = {
    reactStrictMode: true,
    env: {
      API: process.env.API,
    }
  }
  
  
  