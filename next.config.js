/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
}, );
const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://openhouse.mwit.ac.th/' : '',
    env: {
        API_URL: process.env.NODE_ENV === 'development' ? 'https://dev3000.woyiswoy.com' : 'https://mwitophapi.woyiswoy.com',
        // API_URL: 'https://ophdev.loca.lt',
        // CDN_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mwitophcdn.woyiswoy.com',
        CDN_URL: 'https://mwitophcdn.woyiswoy.com',
        ORI_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://openhouse.mwit.ac.th',
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'mwitophcdn.woyiswoy.com',
            port: '',
            pathname: '/img/**',
        }, ],
    },
    // async headers() {
    //     return [{
    //         // matching all API routes
    //         source: "/api/:path*",
    //         headers: [
    //             { key: "Access-Control-Allow-Credentials", value: "true" },
    //             { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
    //             {
    //                 key: "Access-Control-Allow-Methods",
    //                 value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    //             },
    //             {
    //                 key: "Access-Control-Allow-Headers",
    //                 value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //             },
    //         ],
    //     }, ]
    // },
})

module.exports = nextConfig