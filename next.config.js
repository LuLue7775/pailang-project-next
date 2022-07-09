/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['gsap']);

module.exports = withTM({
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  env: {
    DIRECTUS: process.env.DIRECTUS,
  },
  images: {
    domains: ['via.placeholder.com', 'assets.vercel.com', '127.0.0.1' ],
    // formats: [ 'image/jpg', 'image/png'],
  },

})

