'use client';

import { useState } from 'react';
import { useGetProductsQuery } from '../productsSlice';
import ProductCard from './ProductCard';
import ProductSpinner from './ProductSpinner';
import {
	Card,
	CardFooter,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { toast } from 'sonner';

const PAGE_SIZE = 10;

export default function ProductList() {
	const [skip] = useState(0);

	const { data, isLoading, isFetching, isError, refetch } =
		useGetProductsQuery({
			limit: PAGE_SIZE,
			skip,
		});

	if (isError)
		return (
			<section className="px-26 py-10">
				<div className="max-w-md mx-auto">
					<Card className="border-destructive/30 bg-destructive/5 text-destructive-700">
						<div className="flex items-start gap-4">
							<XCircle
								className="text-destructive-600"
								size={28}
							/>
							<div>
								<CardTitle className="text-lg">
									Failed to load products
								</CardTitle>
								<CardDescription>
									There was an error fetching products. Try
									refreshing the page or check your network
									connection.
								</CardDescription>
							</div>
						</div>
						<CardFooter className="mt-4 justify-end">
							<Button
								variant="ghost"
								onClick={async () => {
									try {
										const res = await refetch();
										const r = res as unknown as {
											error?: unknown;
										};
										if (r.error) {
											toast.error(
												'Failed to fetch products'
											);
										} else {
											toast.success('Products refreshed');
										}
									} catch (err) {
										toast.error('Failed to fetch products');
									}
								}}
							>
								Retry
							</Button>
						</CardFooter>
					</Card>
				</div>
			</section>
		);

	const products = data?.products ?? [];

	return (
		<section className="px-26 py-10  ">
			<h1 className="text-3xl font-bold mb-6">Products</h1>

			{isLoading && <ProductSpinner />}

			{products && (
				<div className="justify-between gap-6 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}

			{isFetching && (
				<p className="text-center py-6 text-gray-600">Loading more…</p>
			)}
		</section>
	);
}
