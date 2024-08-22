/**
 * @type {import('next').NextConfig}
 *
 */
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false; // Disable cache in production
    }
    return config;
  },
};

export default nextConfig;