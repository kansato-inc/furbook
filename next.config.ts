import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-auth"],
  transpilePackages: ["@kansato/whistle-react", "@kansato/whistle-sdk"],
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.resolve.alias["@kansato/whistle-react"] = path.resolve(
      "../whistle/sdk/react-sdk/src/index.ts"
    );
    config.resolve.alias["@kansato/whistle-sdk"] = path.resolve(
      "../whistle/sdk/node-sdk/dist/index.js"
    );
    return config;
  },
};

export default nextConfig;
