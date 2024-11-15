/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // Set to true for a permanent redirect (308 status)
      },
    ];
  },
};

export default nextConfig;
