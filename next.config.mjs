/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'localhost',
            'example.com',
            "www.static-src.com",
            'images.tokopedia.net'
        ]
    }
};

export default nextConfig;
