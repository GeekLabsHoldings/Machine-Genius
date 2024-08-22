/**
 * @type {import('next').NextConfig}
 *
 */
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Adjust caching settings for production build
      config.cache = {
        type: 'filesystem',
        // Other cache options can be set here if needed
      };
    }
    return config;
  },
};

export default nextConfig;