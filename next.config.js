/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/service/:serviceSlug",
        destination: "/services/:serviceSlug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/service",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
