/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true
    },
    turbopack: {},
    webpack: (config, { dev }) => {
        if (dev) {
            // disable devtool to avoid noisy invalid source map warnings from some packages
            config.devtool = false
        }
        return config
    }
};

export default nextConfig;
