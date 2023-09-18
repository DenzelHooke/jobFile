/** @type {import('next').NextConfig} */

const API_URL = process.env.DEV
  ? process.env.DEV_SERVER
  : process.env.PROD_SERVER;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
