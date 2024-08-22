/**
 * @type {import('next').NextConfig}
 *
 */
const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    outputFileTracingExcludes: {
      '*': process.env.NODE_ENV !== 'development' ? ['.next/cache'] : [],
    },
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false; // Disable cache in production
    }
    return config;
  },
};

export default nextConfig;