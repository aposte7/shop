import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';

import Image from 'next/image';

export default function Page() {
	return (
		<main>
			<section
				className="px-26 py-10 gap-6 justify-between grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]
"
			>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
				<Card className="pt-0 pb-5  gap-3">
					<Image
						alt="product placeholder"
						src="https://via.placeholder.com/400x500?text=Product+Image"
						width={400}
						height={500}
						className="w-full h-60  border-2 border-accent object-cover"
						unoptimized
					/>
					<div className="space-y-2 px-4">
						<div className="text-slate-400 text-sm">Essence</div>
						<CardTitle>Essence Mascara Lash Princess</CardTitle>

						<div>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={16}
									fill="currentColor"
								/>
								<span className="text-sm font-medium">4.5</span>
							</div>
						</div>
						<div className="text-lg font-bold">120 $</div>
					</div>
					<CardFooter className="gap-4 px-4 py-0">
						<Button className="flex-1">
							<ShoppingCart /> Add To Cart
						</Button>
						<Button>
							{' '}
							<Heart />
						</Button>
					</CardFooter>
				</Card>
			</section>
		</main>
	);
}
