/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com',"firebasestorage.googleapis.com"],
  },
  experimental: {
    serverActions: true,
  },
}
module.exports = nextConfig