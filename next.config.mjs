/** @type {import('next').NextConfig} */

const isElectron = process.env.NEXT_PUBLIC_BUILD_ENV === 'electron';

const nextConfig = {
    reactStrictMode: true,
    ...(isElectron && {
        output: 'export',
        assetPrefix: './',
        basePath: '',
    }),
};

export default nextConfig;
