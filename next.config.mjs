const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('next').NextConfig}
 *
 */
const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    // Conditionally set cache option based on the environment
    cache: !isDev ? false : undefined,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false; // Disable cache in production
    }
    return config;
  },
};

export default nextConfig;
