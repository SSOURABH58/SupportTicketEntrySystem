/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  env: {
    BASE_URL: process.env.BASE_URL,
  }
};
