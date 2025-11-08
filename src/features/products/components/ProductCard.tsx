import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Stars from '@/components/Stars';
import Image from 'next/image';
import { Product } from '../types';
import { RefObject } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useFavorites } from '@/features/favorites/hooks/usefavorites';

interface ProductCardProps {
	product: Product;
	isLast?: boolean;
	lastElRef?: RefObject<HTMLDivElement | null>;
}

function ProductCard({ product, isLast, lastElRef }: ProductCardProps) {
	const { isFavorite, toggle } = useFavorites();
	const isWishlisted = isFavorite(product.id);

	const hasDiscount = product.discountPercentage > 0;
	const discountedPrice = hasDiscount
		? ((product.price * (100 - product.discountPercentage)) / 100).toFixed(
				2
		  )
		: null;

	const handleWishlistClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggle(product);
		toast.success(
			isWishlisted
				? `"${product.title}" removed from favorites`
				: `"${product.title}" added to favorites`
		);
	};

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toast.success(`"${product.title}" added to cart!`);
	};

	return (
		<div className="block group" ref={isLast ? lastElRef : undefined}>
			<Card className="overflow-hidden pt-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-accent/20">
				<Link
					href={`/product/${product.id}`}
					className="block no-underline"
				>
					<div className="relative">
						<Image
							src={product.thumbnail}
							alt={product.title}
							width={400}
							height={240}
							className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
							priority
						/>

						{hasDiscount && (
							<Badge
								variant="destructive"
								className="absolute top-3 left-3 text-xs font-bold"
							>
								-{product.discountPercentage.toFixed(0)}%
							</Badge>
						)}

						{product.stock <= 0 && (
							<Badge
								variant="secondary"
								className="absolute top-3 right-3 text-xs bg-red-100 text-red-700"
							>
								Out of Stock
							</Badge>
						)}
					</div>

					<div className="space-y-2 px-4 pt-3">
						<div className="text-xs text-slate-400 uppercase tracking-wider">
							{product.category}
						</div>

						<CardTitle className="line-clamp-1 text-base font-semibold group-hover:text-cyan-600 transition-colors">
							{product.title}
						</CardTitle>

						<div className="flex items-center gap-1">
							<Stars rating={product.rating} size={16} />
							<span className="text-xs font-medium text-gray-600 ml-1">
								({product.rating})
							</span>
						</div>

						<div className="flex justify-between items-center gap-2">
							{discountedPrice ? (
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold text-green-600">
										${discountedPrice}
									</span>
									<span className="text-sm text-gray-500 line-through">
										${product.price.toFixed(2)}
									</span>
								</div>
							) : (
								<span className="text-lg font-bold">
									${product.price.toFixed(2)}
								</span>
							)}

							{product.stock > 0 && product.stock <= 10 && (
								<p className="text-xs text-orange-600 font-medium">
									Only {product.stock} left!
								</p>
							)}
						</div>
					</div>
				</Link>

				<CardFooter className="gap-2 px-4 py-3 mt-2">
					<Button
						className="flex-1 h-10"
						disabled={product.stock === 0}
						onClick={handleAddToCart}
					>
						<ShoppingCart className="w-4 h-4 mr-1" />
						Add To Cart
					</Button>

					<Button
						variant="outline"
						size="icon"
						className={cn(
							'h-10 w-10 transition-all',
							isWishlisted && 'text-red-500 border-red-500'
						)}
						onClick={handleWishlistClick}
					>
						<Heart
							className={cn(
								'w-4 h-4 transition-all',
								isWishlisted && 'fill-current'
							)}
						/>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default ProductCard;
