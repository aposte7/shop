import { Button } from '@/components/ui/button';
import { Link, MoveLeft } from 'lucide-react';

function ProductDetailError() {
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

export default ProductDetailError;
