import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				pathname: '/api/**',
			},
		],
	},
};

export default nextConfig;
