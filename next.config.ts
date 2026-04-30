import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@kansato/whistle-react",
    "@kansato/whistle-sdk",
  ],
  allowedDevOrigins: ["furbook.kansato.localhost"],
  webpack: (config) => {
    config.resolve.symlinks = true;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@kansato/whistle-react": path.resolve(
        __dirname,
        "../react-sdk/src/index.ts",
      ),
      "@kansato/whistle-sdk": path.resolve(
        __dirname,
        "../node-sdk/dist/index.js",
      ),
    };
    return config;
  },
};

export default nextConfig;
