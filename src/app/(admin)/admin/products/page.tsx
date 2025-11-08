import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Link } from 'lucide-react';
import ProductTable from '../_components/ProductTable';

export default function AdminProductsPage() {
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<h1 className="text-3xl font-bold flex items-center gap-2">
					Products Management
				</h1>
				<Button>
					<Link href="/product/add" className="flex items-center">
						<Edit className="w-4 h-4 mr-2" />
						Add New Product
					</Link>
				</Button>
			</div>

			<Card>
				<ProductTable />
			</Card>
		</div>
	);
}
