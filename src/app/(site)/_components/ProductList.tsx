'use client';

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
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useProductList } from '@/features/products/hooks/useProductList';

export default function ProductList() {
	const {
		products,
		categories,
		selectedSlug,
		setCategory,
		isLoading,
		isFetching,
		isError,
		refetch,
		lastElRef,
	} = useProductList();

	if (isError)
		return (
			<section>
				<div className="max-w-md h-[calc(100dvh-15rem)] flex items-center justify-center mx-auto">
					<Card className="border-destructive/30 bg-destructive/5 text-destructive-700">
						<div className="flex px-6 items-start gap-4">
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
								className="cursor-pointer bg-primary hover:text-primary-foreground hover:bg-primary/80 text-primary-foreground transition-colors duration-300"
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
	const selectedName =
		selectedSlug === 'all'
			? 'All Categories'
			: categories.find((c) => c.slug === selectedSlug)?.name ??
			  'Category';

	return (
		<section>
			<div className="mb-15 space-y-4 relative">
				<h1 className="text-3xl font-bold">Products</h1>

				<div className="relative flex justify-end items-center">
					<Button
						variant="ghost"
						className={cn(
							'peer group flex items-center gap-3 rounded-none border-b-2 border-transparent',
							'border-primary hover:bg-accent/50 transition-all duration-200',
							'font-medium text-foreground'
						)}
					>
						<span className="text-base">{selectedName}</span>
						<ChevronRight className="h-5 w-5 transform transition-transform duration-200 ease-out group-hover:rotate-90" />
					</Button>

					<Card
						className={cn(
							'absolute right-0 top-[calc(100%-7px)] mt-2 w-full',
							'invisible opacity-0 scale-95 -translate-y-2',
							'peer-hover:visible peer-hover:opacity-100 peer-hover:scale-100 peer-hover:translate-y-0',
							'hover:visible hover:opacity-100 hover:scale-100 hover:translate-y-0',
							'transition-all duration-300 ease-out',
							'z-50 shadow-xl border bg-background/95 backdrop-blur-sm',
							'max-h-[60dvh] overflow-y-auto origin-top-right'
						)}
					>
						<CardHeader className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
							<CardTitle className="text-lg font-semibold">
								Categories
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-3">
								<button
									onClick={() => setCategory('all')}
									className={cn(
										'text-left group px-3 py-2 rounded-lg text-sm font-medium',
										'bg-muted/50 hover:bg-primary hover:text-primary-foreground',
										'transition-all duration-200 border border-transparent hover:border-primary/20',
										selectedSlug === 'all' &&
											'bg-primary text-primary-foreground'
									)}
								>
									<div className="flex items-center gap-2">
										<div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary-foreground transition-colors duration-200" />
										All Categories
									</div>
								</button>

								{categories.map((cat) => (
									<button
										key={cat.slug}
										onClick={() => setCategory(cat.slug)}
										className={cn(
											'text-left group px-3 py-2 rounded-lg text-sm font-medium',
											'bg-muted/50 hover:bg-primary hover:text-primary-foreground',
											'transition-all duration-200 border border-transparent hover:border-primary/20',
											selectedSlug === cat.slug &&
												'bg-primary text-primary-foreground'
										)}
									>
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary-foreground transition-colors duration-200" />
											{cat.name}
										</div>
									</button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{isLoading && <ProductSpinner />}

			{products.length > 0 && (
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
						<div className="text-center py-6">
							<ProductSpinner />
						</div>
					)}
				</div>
			)}
		</section>
	);
}
