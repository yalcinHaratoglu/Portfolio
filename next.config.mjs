/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["country-flag-icons"],
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/favicons/favicon.ico", permanent: true },
      { source: "/site.webmanifest", destination: "/favicons/site.webmanifest", permanent: true },
      { source: "/apple-touch-icon.png", destination: "/favicons/apple-touch-icon.png", permanent: true },
    ]
  },
  // Windows + boşluklu yol: polling; .next izlenirse sürekli rebuild döngüsü oluşur
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 500,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/.cursor/**",
          "**/agent-tools/**",
          "**/assets/**",
        ],
      }
    }
    return config
  },
}

export default nextConfig
