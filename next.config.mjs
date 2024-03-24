// @ts-check

/** @type {import('next').NextConfig} */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  experimental: {
    instrumentationHook: true,
    ppr: true,
    mdxRs: true,
  },
  reactStrictMode: true,
  /** @param config {any} */
  webpack: (config) => {
    if (config.name === "server")
      config.optimization.concatenateModules = false;

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "./"),
    };

    return config;
  },
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
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/openapi.json",
      },
    ];
  },
};

export default nextConfig;
