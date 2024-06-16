/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    gaId: process.env.NEXT_PUBLIC_SANITY_GA_ID
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
            {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      }
    ],
    formats: ['image/avif', 'image/webp']
  }
}