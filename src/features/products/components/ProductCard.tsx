// components/ProductCard.tsx
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Stars from '@/components/Stars';
import Image from 'next/image';
import { Product } from '../types';
import { RefObject, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Optional: shadcn utils
import { toast } from 'sonner';

interface ProductCardProps {
	product: Product;
	isLast?: boolean;
	lastElRef?: RefObject<HTMLDivElement | null>;
}

function ProductCard({ product, isLast, lastElRef }: ProductCardProps) {
	const [isWishlisted, setIsWishlisted] = useState(false);

	const hasDiscount = product.discountPercentage > 0;
	const discountedPrice = hasDiscount
		? ((product.price * (100 - product.discountPercentage)) / 100).toFixed(
				2
		  )
		: null;

	return (
		<Link href={`/product/${product.id}`} className="block group">
			<div ref={isLast ? lastElRef : undefined}>
				<Card className="transition-all duration-300 pt-0 hover:-translate-y-1 border-2 border-transparent hover:border-accent/20">
					<div className="relative">
						<Image
							src={product.thumbnail}
							alt={product.title}
							width={400}
							height={240}
							className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
							priority
							unoptimized={false}
						/>

						{hasDiscount && (
							<Badge
								variant="destructive"
								className="absolute top-3 left-3 text-xs font-bold"
							>
								-{product.discountPercentage.toFixed(0)}%
							</Badge>
						)}

						{product.stock >= 0 && (
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

						<CardTitle className="line-clamp-2 text-base font-semibold group-hover:text-cyan-600 transition-colors">
							{product.title}
						</CardTitle>

						<div className="flex items-center gap-1">
							<Stars
								rating={product.rating}
								size={16}
								className="transition-colors"
							/>
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

					<CardFooter className="gap-2 px-4 py-3 mt-2">
						<Button
							className="flex-1 h-10"
							disabled={product.stock === 0}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();

								toast.success(
									`Successful added Product ${product.id}to cart`
								);
							}}
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
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIsWishlisted(!isWishlisted);
							}}
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
		</Link>
	);
}

export default ProductCard;
