'use client';

import { Button } from '@/components/ui/button';
import { X, Home, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/features/products/components/ProductCard';
import { useFavorites } from '../hooks/usefavorites';

export default function FavoritesPage() {
	const { favorites, remove } = useFavorites();

	if (favorites.length === 0) {
		return (
			<div className="max-w-7xl mx-auto p-8 text-center">
				<h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
				<p className="text-gray-500">No products added yet.</p>

				<Link href="/" className="inline-block mt-6">
					<Button variant="outline" className="gap-2 items-center">
						<MoveLeft className="w-4 h-4" />
						<span>Back to Home</span>
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto p-8">
			<h1 className="text-2xl font-bold mb-6">
				Your Favorites ({favorites.length})
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{favorites.map((product) => (
					<div key={product.id} className="relative group">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
}
