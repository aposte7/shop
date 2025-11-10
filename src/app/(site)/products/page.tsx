import React, { Suspense } from 'react';
import ProductList from '../_components/ProductList';
import ClientFallback from '@/components/ui/ClientFallback';

export default function Page() {
	return (
		<Suspense
			fallback={
				<div className="w-full py-12">
					<ClientFallback />
				</div>
			}
		>
			<ProductList />
		</Suspense>
	);
}
