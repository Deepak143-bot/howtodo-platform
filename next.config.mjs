/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the build to finish even if there are small type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores linting errors during build
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.github.dev', '*.app.github.dev', '*.vercel.app'],
    },
  },
};

export default nextConfig;
