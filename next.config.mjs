/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static: no backend, no server runtime. Deploys as plain files to
  // Netlify, Vercel, GitHub Pages or any static host.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
