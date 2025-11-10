import React, { Suspense } from 'react';
import FavoritesProductList from '@/features/favorites/components/FavoritesProductList';
import ClientFallback from '@/components/ui/ClientFallback';

export const metadata = {
	title: 'Favorites',
};

export default function FavoritesPage() {
	return (
		<Suspense
			fallback={
				<div className="w-full py-12">
					<ClientFallback />
				</div>
			}
		>
			<FavoritesProductList />
		</Suspense>
	);
}
