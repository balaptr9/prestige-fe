import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['localhost', 'res.cloudinary.com'], // Add your image domains
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/proxy/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                ],
            },
        ]
    },
}

export default nextConfig
