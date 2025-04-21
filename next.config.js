/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["^fdprocessedid$"] }
        : false,
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
      // Add exception for auth callback
      {
        source: "/auth/callback",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // Less restrictive
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
