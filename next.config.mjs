/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/td-questionnaire' : '',
  assetPrefix: isProd ? '/td-questionnaire/' : '',
};

export default nextConfig;
