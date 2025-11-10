import React, { Suspense } from 'react';
import FavoritesProductList from '@/features/favorites/components/FavoritesProductList';
import { Spinner } from '@/components/ui/spinner';

export const metadata = {
	title: 'Favorites',
};

export default function FavoritesPage() {
	return (
		<Suspense
			fallback={
				<div className="w-full py-12 flex items-center justify-center">
					<Spinner className="size-7 text-primary" />
				</div>
			}
		>
			<FavoritesProductList />
		</Suspense>
	);
}
