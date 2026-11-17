/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // sitemap は毎回作るので、CDN で5分持たせる（古い版を返しつつ裏で作り直す）
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=3600" }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lat91.co.jp" }],
        destination: "https://www.lat91.co.jp/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "lat91.jp" }],
        destination: "https://www.lat91.co.jp/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lat91.jp" }],
        destination: "https://www.lat91.co.jp/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
