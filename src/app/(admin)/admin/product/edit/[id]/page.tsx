'use client';
import { AlertCircle } from 'lucide-react';
import ProductForm from '../../../_components/ProductForm';
import { useGetProductByIdQuery } from '@/features/products/productsApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReturnButton from '../../../_components/ReturnButton';
import { useParams } from 'next/navigation';

export default function Page() {
	const params = useParams();
	const id = params.id as string;

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProductByIdQuery(Number(id));

	if (isLoading) {
		return (
			<div className="max-w-2xl mx-auto p-6 space-y-4">
				<Skeleton className="h-10 w-48" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (isError || !product) {
		return (
			<div className="max-w-2xl mx-auto p-6">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>Product not found.</AlertDescription>
				</Alert>
			</div>
		);
	}
	return (
		<section className="w-full">
			<div>
				<ReturnButton />

				<div className="flex flex-col max-w-3xl px-6 gap-2">
					<h1 className="text-2xl font-semibold flex items-center gap-2">
						Add New Product
					</h1>
					<p className=" text-muted-foreground ">
						Create a new product to appear in the store catalog.
						Fill in the fields below and click &quot;Add
						Product&quot; when ready.
					</p>
				</div>
			</div>

			<div className="py-6 w-full flex justify-center items-center">
				<ProductForm product={product} />
			</div>
		</section>
	);
}
