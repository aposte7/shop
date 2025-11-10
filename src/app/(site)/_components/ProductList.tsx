'use client';

import { useEffect, useRef, useState } from 'react';
import { useGetProductsQuery } from '../../../features/products/productsApi';
import ProductCard from './ProductCard';
import ProductSpinner from './ProductSpinner';
import {
	Card,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PAGE_SIZE = 10;

const categories = [
	'Mobiles',
	'Laptops',
	'Tablets',
	'Headphones',
	'Smartwatches',
	'Cameras',
	'Speakers',
	'TVs',
	'Gaming',
	'Accessories',
	'Printers',
	'Monitors',
	'Storage',
	'Networking',
	'Software',
];
export default function ProductList() {
	const [skip, setSkip] = useState(10);

	const { data, isLoading, isFetching, isError, refetch } =
		useGetProductsQuery({
			limit: PAGE_SIZE,
			skip,
		});

	const observer = useRef<IntersectionObserver | null>(null);
	const lastElRef = useRef<HTMLDivElement>(null);

	const hasMore = data && skip + PAGE_SIZE < data.total;

	useEffect(() => {
		if (!hasMore || isFetching) return;

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setSkip((prev) => prev + PAGE_SIZE);
			}
		});

		if (lastElRef.current) observer.current.observe(lastElRef.current);

		return () => observer.current?.disconnect();
	}, [hasMore, isFetching]);

	if (isError)
		return (
			<section className="xl:px-26 md:px-15 px-6  py-10">
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
									} catch {
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
		<section className="xl:px-26 md:px-15 px-10 py-10  ">
			<div className="mb-10 space-y-4 relative">
				<h1 className="text-2xl font-bold">Products</h1>

				<div className="relative flex justify-end items-center">
					<Button
						variant="ghost"
						className={cn(
							'peer flex items-center gap-2 rounded-none border-b-2 border-transparent',
							'hover:border-primary hover:bg-accent/50 transition-all duration-200',
							'font-medium text-foreground'
						)}
					>
						<Menu className="h-5 w-5" />
						All Categories
					</Button>

					<Card
						className={cn(
							'absolute right-0 top-[calc(100%-7px)] mt-2  w-full',
							'invisible opacity-0 scale-95 -translate-y-2',
							'peer-hover:visible peer-hover:opacity-100 peer-hover:scale-100 peer-hover:translate-y-0',
							'hover:visible hover:opacity-100 hover:scale-100 hover:translate-y-0',
							'transition-all duration-300 ease-out',
							'z-50 shadow-xl border bg-background/95 backdrop-blur-sm',
							'max-h-[60dvh] overflow-y-auto',
							'origin-top-right'
						)}
					>
						<CardHeader className="sticky top-0 bg-background/80 backdrop-blur-sm block z-10">
							<CardTitle className="text-lg font-semibold ">
								Categories
							</CardTitle>
						</CardHeader>

						<CardContent className="">
							<div className="flex flex-wrap gap-3">
								{categories.map((category) => (
									<button
										key={category}
										className={cn(
											'text-left group px-3 py-2 rounded-lg text-sm font-medium',
											'bg-muted/50 hover:bg-primary hover:text-primary-foreground',
											'transition-all duration-200',
											'border border-transparent hover:border-primary/20'
										)}
									>
										<Link
											href={`?${category}`}
											className="flex items-center gap-2"
										>
											<div className="h-2 group-hover:bg-primary-foreground transition-colors duration-200 w-2 rounded-full bg-primary/60" />

											{category}
										</Link>
									</button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{isLoading && <ProductSpinner />}

			{products && (
				<div>
					<div className="justify-between gap-6 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
						{products.map((product, idx) => (
							<ProductCard
								key={product.id}
								product={product}
								isLast={idx === products.length - 1}
								lastElRef={lastElRef}
							/>
						))}
					</div>
					{isFetching && !isLoading && (
						<div className="text-center py-6 text-gray-600">
							<ProductSpinner />
						</div>
					)}
				</div>
			)}
		</section>
	);
}
