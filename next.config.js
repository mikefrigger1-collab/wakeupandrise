/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optional: for better deployment
  trailingSlash: false,
  // Ensure static assets are handled correctly
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig