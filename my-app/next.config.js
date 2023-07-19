/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: '_static',
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
