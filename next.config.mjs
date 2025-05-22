/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static site generation
  images: {
    unoptimized: true, // Required for SSG with images
    remotePatterns: [
      {
        hostname: "images.contentstack.io",
      },
      {
        protocol: "https",
        hostname: "*-images.contentstack.com",
      },
    ],
  },
  // If you need to support dynamic routes with SSG, you'll need to modify this
  // and add a getStaticPaths setup in your page component
};
export default nextConfig;
