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
        // sitemap は毎回作るので、Vercel の CDN で5分持たせる（古い版を返しつつ裏で作り直す・失敗時は1日古い版でしのぐ）。
        // 普通の Cache-Control は Next が sitemap に付ける値に負けるので、CDN 専用のヘッダーで渡す。
        source: "/sitemap.xml",
        headers: [{ key: "Vercel-CDN-Cache-Control", value: "max-age=300, stale-while-revalidate=3600, stale-if-error=86400" }],
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
