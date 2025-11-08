'use client';

import { useState, useRef, useEffect } from 'react';
import { useGetProductsQuery } from '../productsSlice';
import ProductCard from './ProductCard';

const PAGE_SIZE = 10;

export default function ProductList() {
	const [skip, setSkip] = useState(0);

	const { data, isLoading, isFetching, isError } = useGetProductsQuery({
		limit: PAGE_SIZE,
		skip,
	});

	if (isLoading) return <p className="text-center py-8">Loading…</p>;
	if (isError)
		return (
			<p className="text-center py-8 text-red-600">
				Failed to load products.
			</p>
		);

	const products = data?.products ?? [];

	return (
		<section className="px-26 py-10  ">
			<h1 className="text-3xl font-bold mb-6">Products</h1>

			<div className="justify-between gap-6 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{isFetching && (
				<p className="text-center py-6 text-gray-600">Loading more…</p>
			)}
		</section>
	);
}
