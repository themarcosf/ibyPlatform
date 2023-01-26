/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    BASEURL: "https://enigmatic-cove-57254.herokuapp.com/api/v1",
  },
};

module.exports = nextConfig;
