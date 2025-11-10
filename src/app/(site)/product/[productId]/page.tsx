import React, { Suspense } from 'react';
import ProductDetail from '@/app/(site)/_components/ProductDetail';
import ClientFallback from '@/components/ui/ClientFallback';

export default async function page({
	params,
}: {
	params: { productId: string };
}) {
	const { productId } = await params;

	return (
		<Suspense
			fallback={
				<div className="w-full py-12">
					<ClientFallback />
				</div>
			}
		>
			<ProductDetail productId={Number(productId)} />
		</Suspense>
	);
}
