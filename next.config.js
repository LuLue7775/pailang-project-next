/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  env: {
    DIRECTUS_ROOT: process.env.DIRECTUS_ROOT,
    DIRECTUS_CUSTOM_ENDPOINT: process.env.DIRECTUS_CUSTOM_ENDPOINT,
    NEXT_PUBLIC_DIRECTUS_ENDPOINT: process.env.NEXT_PUBLIC_DIRECTUS_ENDPOINT,
    NEXT_PUBLIC_DIRECTUS_CUSTOM_ENDPOINT: process.env.NEXT_PUBLIC_DIRECTUS_CUSTOM_ENDPOINT,
    NEXT_PUBLIC_DEV: process.env.NEXT_PUBLIC_DEV,
    NEXT_PUBLIC_DOMAIN_DEV: process.env.NEXT_PUBLIC_DOMAIN_DEV
  },
  images: {
    domains: ['via.placeholder.com', `${process.env.DIRECTUS_ROOT}`]
    // formats: [ 'image/jpg', 'image/png'],
  },
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              frame-src 'self' https://www.youtube.com https://www.google.com https://*.google.com https://maps.gstatic.com https://*.googleapis.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com;
              img-src 'self' data: https://*.googleapis.com https://*.gstatic.com https://*.google.com;
            `
              .replace(/\s{2,}/g, ' ')
              .trim()
          }
        ]
      }
    ]
  }
}
