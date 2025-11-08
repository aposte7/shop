import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';
import { RefObject } from 'react';
import Link from 'next/link';

interface ProductCardProps {
	product: Product;
	isLast?: boolean;
	lastElRef?: RefObject<HTMLDivElement | null>;
}

function ProductCard({ product, isLast, lastElRef }: ProductCardProps) {
	return (
		<Link
			href={`product/${product.id}`}
			ref={isLast ? lastElRef : undefined}
		>
			<Card className="pt-0 pb-5  gap-3">
				<Image
					alt="product placeholder"
					src={product.thumbnail}
					width={400}
					height={500}
					className="w-full h-60  border-2 border-accent object-cover"
					unoptimized
				/>
				<div className="space-y-2 px-4">
					<div className="text-slate-400 text-sm">
						{product.category}
					</div>
					<CardTitle>{product.title}</CardTitle>

					<div>
						<div className="inline-flex items-center gap-2">
							<Star
								className="text-yellow-400 "
								size={16}
								fill="currentColor"
							/>
							<span className="text-sm font-medium">
								{product.rating}
							</span>
						</div>
					</div>
					<div className="text-lg font-bold">
						$ {product.discountPercentage}
					</div>
				</div>
				<CardFooter className="gap-4 px-4 py-0">
					<Button className="flex-1">
						<ShoppingCart /> Add To Cart
					</Button>
					<Button>
						<Heart />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}

export default ProductCard;
