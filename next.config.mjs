/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix: In Next.js 14, serverActions must go inside the 'experimental' block
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.github.dev', '*.app.github.dev'],
    },
  },
};

export default nextConfig;
