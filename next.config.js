/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    //  deployment
      REACT_APP_URI: 'https://tigdashboardapi-wckqd7o3eq-uw.a.run.app',
  
    //  local
      // REACT_APP_URI: 'https://localhost:8081/',
  
      //  AWS
      // REACT_APP_URI: 'https://172.20.36.39:8084/',
  
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      unoptimized: true,
    },
}

module.exports = nextConfig

