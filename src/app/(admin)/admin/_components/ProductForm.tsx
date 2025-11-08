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
import { useRouter } from 'next/navigation';
import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from '@/features/products/productsApi';
import { Loader2 } from 'lucide-react';

const productSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters'),
	price: z.string().refine((val) => parseFloat(val) > 0, {
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

interface ProductFormProps {
	product?: {
		id: number;
		title: string;
		description: string;
		price: number;
		stock: number;
		brand: string;
		category: string;
	};
	onSuccess?: () => void;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
	const router = useRouter();
	const isEdit = !!product;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: product
			? {
					title: product.title,
					description: product.description,
					price: product.price.toString(),
					stock: product.stock.toString(),
					brand: product.brand,
					category: product.category,
			  }
			: undefined,
	});

	const [createProduct, { isLoading: isCreating }] =
		useCreateProductMutation();
	const [updateProduct, { isLoading: isUpdating }] =
		useUpdateProductMutation();
	const isLoading = isCreating || isUpdating;

	const onSubmit = async (data: ProductFormData) => {
		try {
			if (isEdit) {
				await updateProduct({
					id: product.id,
					title: data.title,
					description: data.description,
					price: parseFloat(data.price),
					stock: parseInt(data.stock, 10),
					brand: data.brand,
					category: data.category,
				}).unwrap();
				toast.success('Product updated successfully!');
			} else {
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
			}
			onSuccess?.();
		} catch (error) {
			toast.error(
				isEdit ? 'Failed to update product.' : 'Failed to add product.'
			);
			console.error(error);
		}
	};

	return (
		<Card>
			<CardContent className="w-160">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								{...register('title')}
								placeholder="iPhone 15"
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
								placeholder="Apple"
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
							placeholder="Latest model..."
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
							onClick={() => router.push('/admin/products')}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									{isEdit ? 'Updating...' : 'Adding...'}
								</>
							) : isEdit ? (
								'Update Product'
							) : (
								'Add Product'
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
