/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  env: {
    DIRECTUS_ROOT: process.env.DIRECTUS_ROOT,
    DIRECTUS: process.env.DIRECTUS,
    NEXT_PPUBLIC_DIRECTUS: process.env.NEXT_PPUBLIC_DIRECTUS,
    NEXT_PUBLIC_DEV: process.env.NEXT_PUBLIC_DEV,
  },
  images: {
    domains: ['via.placeholder.com', `${process.env.DIRECTUS_ROOT}` ],
    // formats: [ 'image/jpg', 'image/png'],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
        ],
      },
    ]
  }
}

