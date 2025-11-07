import { Button } from '@/components/ui/button';
import { MoveLeft, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = { params: { productId: string } };

export default async function Page({ params }: Props) {
	const { productId } = await params;

	return (
		<main className="px-25 py-4">
			<section>
				<Button
					className="w-20 gap-4 border-0 shadow-none"
					variant="outline"
				>
					<MoveLeft /> <span>Back</span>
				</Button>

				<div className="flex flex-wrap py-4 w-full gap-10">
					<div className="flex-1 space-y-4">
						<img
							alt="product placeholder"
							src="https://via.placeholder.com/400x500?text=Product+Image"
							width={400}
							height={500}
							className="min-w-[400px] w-full h-125 rounded-2xl  border-2 border-black object-cover"
						/>
						<div className="flex gap-2 py-2">
							<img
								alt="product placeholder"
								src="https://via.placeholder.com/400x500?text=Product+Image"
								width={400}
								height={500}
								className="w-24 h-24  border-2 border-accent object-cover"
							/>
							<img
								alt="product placeholder"
								src="https://via.placeholder.com/400x500?text=Product+Image"
								width={400}
								height={500}
								className="w-24 h-24 border-2 border-accent object-cover"
							/>
							<img
								alt="product placeholder"
								src="https://via.placeholder.com/400x500?text=Product+Image"
								width={400}
								height={500}
								className="w-24 h-24  border-2 border-accent object-cover"
							/>
						</div>
					</div>

					<div className="h-fit flex-1 space-y-5 pb-6">
						<div className="min-w-[400px] w-full ">
							<div className="font-light mb-2 text-lg">
								Essence
							</div>
							<h1 className="text-3xl font-bold">
								Essence Mascara Lash Princess
							</h1>
							<div className="inline-flex items-center gap-2">
								<Star
									className="text-yellow-400 "
									size={18}
									fill="currentColor"
								/>
								<span className="text font-medium">4.5</span>
							</div>
						</div>

						<div className="text-3xl font-bold">120 $</div>

						<p className="text-slate-500">
							The Essence Mascara Lash Princess is a popular
							mascara known for its volumizing and lengthening
							effects. Achieve dramatic lashes with this
							long-lasting and cruelty-free formula.
						</p>

						<Button className="flex w-full gap-3 py-6 ">
							<ShoppingCart className="text-4xl" />{' '}
							<span className="text-base">Add To Cart</span>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
