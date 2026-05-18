/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/@uploadthing/ }
    ];
    return config;
  }
};

export default nextConfig;
