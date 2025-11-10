'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	useGetProductsQuery,
	useGetCategoriesQuery,
} from '@/features/products/productsApi';

const PAGE_SIZE = 10;

export function useProductList() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedSlug = searchParams.get('category') ?? 'all';
	const searchQuery = searchParams.get('search') ?? undefined;

	const [skip, setSkip] = useState(0);

	const {
		data: apiCategories = [],
		isLoading: catsLoading,
		isError: catsError,
	} = useGetCategoriesQuery();

	const { data, isLoading, isFetching, isError, refetch } =
		useGetProductsQuery({
			limit: PAGE_SIZE,
			skip,
			categorySlug: selectedSlug === 'all' ? undefined : selectedSlug,
			searchQuery: searchQuery,
		});

	const products = data?.products ?? [];
	const hasMore = data && skip + PAGE_SIZE < data.total;

	const observer = useRef<IntersectionObserver | null>(null);
	const lastElRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!hasMore || isFetching) return;
		observer.current?.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) setSkip((p) => p + PAGE_SIZE);
		});

		if (lastElRef.current) observer.current.observe(lastElRef.current);
		return () => observer.current?.disconnect();
	}, [hasMore, isFetching]);

	const setCategory = (slug: string) => {
		const newParams = new URLSearchParams(searchParams);
		newParams.delete('search');
		if (slug === 'all') newParams.delete('category');
		else newParams.set('category', slug);
		router.replace(`?${newParams.toString()}`);
		setSkip(0);
	};

	const categories = apiCategories.map((c) => ({
		slug: c.slug,
		name: c.name ?? c.slug.charAt(0).toUpperCase() + c.slug.slice(1),
	}));

	return {
		products,
		categories,
		selectedSlug,
		setCategory,
		isLoading: isLoading || catsLoading,
		isFetching,
		isError: isError || catsError,
		refetch,
		lastElRef,
	};
}
