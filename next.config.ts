import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

export default () => {
  const nextConfig: NextConfig = {
    async redirects() {
      return [{ source: "/features", destination: "/", permanent: true }];
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          dns: false,
          net: false,
          tls: false,
          fs: false,
          child_process: false,
        };
      }
      return config;
    },
  };
  const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
  return withNextIntl(nextConfig);
};
