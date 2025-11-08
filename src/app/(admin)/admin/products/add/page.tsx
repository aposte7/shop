'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Package, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/features/products/productsApi';

const productSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters'),
	price: z
		.string()
		.refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
			message: 'Price must be a positive number',
		}),
	stock: z
		.string()
		.refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
			message: 'Stock must be a non-negative integer',
		}),
	brand: z.string().min(2, 'Brand must be at least 2 characters'),
	category: z.string().min(3, 'Category must be at least 3 characters'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductPage() {
	const router = useRouter();
	const [createProduct, { isLoading }] = useCreateProductMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
	});

	const onSubmit = async (data: ProductFormData) => {
		try {
			await createProduct({
				title: data.title,
				description: data.description,
				price: parseFloat(data.price),
				stock: parseInt(data.stock, 10),
				brand: data.brand,
				category: data.category,
			}).unwrap();

			toast.success('Product added successfully!');
			reset();
		} catch (error) {
			toast.error('Failed to add product. Please try again.');
			console.error(error);
		}
	};

	return (
		<section className="w-full">
			<div>
				<Button
					variant="ghost"
					className="mb-6"
					size="sm"
					onClick={() => router.back()}
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back
				</Button>
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
				<Card>
					<CardContent className="w-[40rem]">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										{...register('title')}
										placeholder="e.g. iPhone 15"
									/>
									{errors.title && (
										<p className="text-sm text-red-600">
											{errors.title.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="brand">Brand</Label>
									<Input
										id="brand"
										{...register('brand')}
										placeholder="e.g. Apple"
									/>
									{errors.brand && (
										<p className="text-sm text-red-600">
											{errors.brand.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="price">Price ($)</Label>
									<Input
										id="price"
										type="number"
										step="0.01"
										{...register('price')}
										placeholder="999.99"
									/>
									{errors.price && (
										<p className="text-sm text-red-600">
											{errors.price.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="stock">Stock</Label>
									<Input
										id="stock"
										type="number"
										{...register('stock')}
										placeholder="50"
									/>
									{errors.stock && (
										<p className="text-sm text-red-600">
											{errors.stock.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Input
										id="category"
										{...register('category')}
										placeholder="smartphones"
									/>
									{errors.category && (
										<p className="text-sm text-red-600">
											{errors.category.message}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									{...register('description')}
									placeholder="Latest model with A17 Pro chip..."
									rows={4}
								/>
								{errors.description && (
									<p className="text-sm text-red-600">
										{errors.description.message}
									</p>
								)}
							</div>

							<div className="flex gap-3 justify-end">
								<Button
									type="button"
									variant="outline"
									onClick={() =>
										router.push('/admin/products')
									}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Adding...
										</>
									) : (
										'Add Product'
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
