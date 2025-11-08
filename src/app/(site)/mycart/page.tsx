import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
	title: 'My Cart',
};

export default function MyCartPage() {
	return (
		<main className="max-w-7xl mx-auto p-8 text-center">
			<h1 className="text-3xl font-bold mb-4">My Cart</h1>
			<p className="text-gray-600 mb-6">
				We&apos;re working on this page coming soon.
			</p>

			<Link href="/" className="inline-block">
				<Button variant="outline" className="gap-2">
					Back to Home
				</Button>
			</Link>
		</main>
	);
}
