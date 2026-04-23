import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /** better-auth: Next compiles ESM with correct React 19 / Webpack interop (avoids `null.useRef` from `useSession`). */
  transpilePackages: [
    "better-auth",
    "@kansato/whistle-react",
    "@kansato/whistle-sdk",
  ],
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@kansato/whistle-react": path.resolve(
        "../../whistle/sdk/react-sdk/src/index.ts",
      ),
      "@kansato/whistle-sdk": path.resolve(
        "../../whistle/sdk/node-sdk/dist/index.js",
      ),
    };
    return config;
  },
};

export default nextConfig;
