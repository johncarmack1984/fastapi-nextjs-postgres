// @ts-check

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    mdxRs: true,
  },
  reactStrictMode: true,
  // /** @param config {any} */
  // webpack: (config) => {
  //   if (config.name === "server") config.optimization.concatenateModules = true;

  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "@": resolve(__dirname, "./"),
  //   };

  //   return config;
  // },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/community/post",
        destination: "/community",
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.PROTOCOL}://${process.env.VERCEL_URL}/api/:path*`,
      },
      {
        source: "/docs",
        destination: `${process.env.PROTOCOL}://${process.env.VERCEL_URL}/api/docs`,
      },
      {
        source: "/openapi.json",
        destination: `${process.env.PROTOCOL}://${process.env.VERCEL_URL}/api/openapi.json`,
      },
    ];
  },
};

export default nextConfig;
