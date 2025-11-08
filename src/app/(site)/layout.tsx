import { Input } from '@/components/ui/input';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
function layout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="flex px-12 py-4 bg-secondary justify-between">
				<div className="text-3xl font-bold">
					<Link href="/">ShopKoo</Link>
				</div>
				<Input
					placeholder="Search product..."
					className="max-w-96 rounded-full border-slate-300/80"
					type="text"
				/>
				<div className="flex gap-5">
					<Link href="mychart">
						<ShoppingCart />
					</Link>
					<Link href="favorites">
						<Heart
							className="text-red-600"
							// fill="currentColor"
						/>
					</Link>
				</div>
			</header>

			{children}
		</>
	);
}

export default layout;
