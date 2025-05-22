/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Desactivar la comprobación de tipos durante la compilación
    ignoreBuildErrors: true,
  },
  eslint: {
    // Desactivar la comprobación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;