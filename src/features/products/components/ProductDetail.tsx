'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MoveLeft, Package, Truck, Shield } from 'lucide-react';
import Stars from '@/components/Stars';
import Image from 'next/image';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { useGetProductByIdQuery } from '@/features/products/productsSlice';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

type Props = {
	productId?: number;
};

export default function ProductDetail({ productId }: Props) {
	const router = useRouter();

	const [selectedImage, setSelectedImage] = useState(0);

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProductByIdQuery(productId ? Number(productId) : skipToken);

	const handleAddToCart = () => {
		toast.success(`${product?.title} added to cart!`);
	};

	if (isLoading) return <ProductSkeleton />;
	if (isError || !product) return <ErrorState />;

	const discountPrice =
		product.discountPercentage > 0
			? (
					(product.price * (100 - product.discountPercentage)) /
					100
			  ).toFixed(2)
			: null;

	return (
		<div className="max-w-7xl mx-auto p-4 md:p-8">
			{/* Back Button */}
			<Button
				onClick={() => router.back()}
				variant="outline"
				className="w-20 gap-2 border-0 shadow-none mb-6"
			>
				<MoveLeft size={18} /> <span>Back</span>
			</Button>

			<section>
				<div className="flex flex-wrap w-full gap-8 md:gap-10">
					<div className="flex-1 space-y-4 min-w-[300px]">
						<div className="relative w-full h-96 md:h-[500px] rounded-2xl border-2 border-black overflow-hidden">
							<Image
								src={
									product.images[selectedImage] ||
									product.thumbnail
								}
								alt={product.title}
								fill
								className="object-cover"
								priority
							/>
						</div>

						<div className="flex gap-2 py-2 overflow-x-auto">
							{[product.thumbnail, ...product.images]
								.slice(0, 4)
								.map((img, i) => (
									<button
										key={i}
										onClick={() => setSelectedImage(i)}
										className={`shrink-0 w-24 h-24 rounded-lg border-2 overflow-hidden transition-all ${
											selectedImage === i
												? 'border-accent'
												: 'border-gray-300'
										}`}
									>
										<Image
											src={img}
											alt={`Thumbnail ${i + 1}`}
											width={96}
											height={96}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
						</div>
					</div>

					<div className="flex-1 space-y-5 min-w-[300px] pb-6">
						<div>
							<p className="font-light mb-2 text-lg text-gray-600">
								{product.brand}
							</p>
							<h1 className="text-3xl font-bold">
								{product.title}
							</h1>
							<div className="inline-flex items-center gap-2 mt-2">
								<Stars rating={product.rating} />

								<span className="text font-medium">
									{product.rating}
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="flex items-center gap-3">
							{discountPrice ? (
								<>
									<span className="text-3xl font-bold text-green-600">
										${discountPrice}
									</span>
									<span className="text-xl text-gray-500 line-through">
										${product.price.toFixed(2)}
									</span>
									<Badge variant="destructive">
										-{product.discountPercentage.toFixed(0)}
										%
									</Badge>
								</>
							) : (
								<span className="text-3xl font-bold">
									${product.price.toFixed(2)}
								</span>
							)}
						</div>

						<div className="space-y-2 text-sm">
							<p className="flex items-center gap-2">
								<Package className="w-4 h-4" />
								<span
									className={
										product.stock > 0
											? 'text-green-600'
											: 'text-red-600'
									}
								>
									{product.stock > 0
										? `${product.stock} in stock`
										: 'Out of stock'}
								</span>
							</p>
							<p className="flex items-center gap-2">
								<Truck className="w-4 h-4" />
								{product.shippingInformation}
							</p>
							<p className="flex items-center gap-2">
								<Shield className="w-4 h-4" />
								{product.warrantyInformation}
							</p>
						</div>

						{/* Description */}
						<p className="text-slate-500 leading-relaxed">
							{product.description}
						</p>

						{/* Add to Cart */}
						<Button
							onClick={handleAddToCart}
							disabled={product.stock === 0}
							className="flex w-full gap-3 py-6 text-base"
						>
							<ShoppingCart className="w-5 h-5" />
							<span>
								{product.stock > 0
									? 'Add To Cart'
									: 'Out of Stock'}
							</span>
						</Button>
					</div>
				</div>
			</section>

			{/* Reviews Section */}
			<section className="py-20">
				<Card className="p-6 rounded-xl border border-secondary">
					<h2 className="text-xl font-semibold">
						Reviews ({product.reviews.length})
					</h2>

					<div className="mt-5 space-y-6">
						{product.reviews.length === 0 ? (
							<p className="text-gray-500">No reviews yet.</p>
						) : (
							product.reviews.map((review, i) => (
								<div
									key={i}
									className="border-b last:border-0 pb-4"
								>
									<div className="flex items-center gap-4">
										{/* Reviewer Avatar */}
										<div className="w-12 h-12 rounded-full border-2 border-accent overflow-hidden bg-gray-200">
											<Image
												src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
													review.reviewerName
												)}&background=random`}
												alt={review.reviewerName}
												width={48}
												height={48}
												className="w-full h-full object-cover"
											/>
										</div>

										<div className="flex flex-1 justify-between">
											<div className="flex gap-4">
												<div>
													<p className="text-sm font-medium">
														{review.reviewerName}
													</p>
													<p className="text-xs text-slate-400">
														{review.reviewerEmail}
													</p>
												</div>

												<div className="flex gap-0.5 items-center mt-1">
													<Stars
														rating={review.rating}
														size={15}
													/>
												</div>
											</div>

											<div className="text-sm text-slate-400">
												{new Date(
													review.date
												).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
										</div>
									</div>

									<p className="py-2 text-gray-700">
										{review.comment}
									</p>
								</div>
							))
						)}
					</div>
				</Card>
			</section>
		</div>
	);
}

function ErrorState() {
	return (
		<div className="max-w-7xl mx-auto p-8 text-center py-20">
			<h1 className="text-3xl font-bold text-red-600 mb-4">
				Product Not Found
			</h1>
			<p className="text-gray-600 mb-8">
				The product you are looking for does not exist.
			</p>
			<Link href="/">
				<Button variant="outline" className="gap-2">
					<MoveLeft /> Back to Home
				</Button>
			</Link>
		</div>
	);
}

function ProductSkeleton() {
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-8">
			<Skeleton className="h-10 w-20 mb-6" />

			<div className="flex flex-wrap gap-10">
				<div className="flex-1 space-y-4 min-w-[300px]">
					<Skeleton className="w-full h-96 md:h-[500px] rounded-2xl" />
					<div className="flex gap-2">
						{[...Array(4)].map((_, i) => (
							<Skeleton
								key={i}
								className="w-24 h-24 rounded-lg"
							/>
						))}
					</div>
				</div>

				<div className="flex-1 space-y-5 min-w-[300px]">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>
		</div>
	);
}
// Note: ProductDetail component exported above.
