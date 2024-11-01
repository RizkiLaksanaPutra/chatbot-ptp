/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/chatbot",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chatbot",
        permanent: false,
        basePath: false,
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ["faiss-node"],
  },
};
export default nextConfig;
