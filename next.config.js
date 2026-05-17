// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Temporary increase - we'll use direct uploads instead
    },
  },
}

module.exports = nextConfig