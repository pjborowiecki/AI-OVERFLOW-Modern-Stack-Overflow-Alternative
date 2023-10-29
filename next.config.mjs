await import("./src/env.mjs")
/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
}

export default nextConfig
