/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    gaId: process.env.NEXT_PUBLIC_SANITY_GA_ID
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io', 'res.cloudinary.com']
  }
}