/** @type {import('next').NextConfig} */
const nextConfig = {
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
