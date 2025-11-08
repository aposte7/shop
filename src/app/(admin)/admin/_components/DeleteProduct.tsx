'use client';

import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { useDeleteProductMutation } from '@/features/products/productsApi';

interface DeleteButtonProps {
	productId: number;
	productTitle: string;
	onSuccess?: () => void;
}

export default function DeleteButton({
	productId,
	productTitle,
	onSuccess,
}: DeleteButtonProps) {
	const [open, setOpen] = useState(false);
	const [deleteProduct, { isLoading }] = useDeleteProductMutation();

	const handleDelete = async () => {
		try {
			await deleteProduct(productId).unwrap();
			toast.success(`"${productTitle}" deleted successfully.`);
			setOpen(false);
			onSuccess?.();
		} catch (error) {
			toast.error('Failed to delete product.');
			console.error(error);
		}
	};

	return (
		<>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setOpen(true);
				}}
				className="flex w-full items-center gap-2"
			>
				<Trash2 className="h-4 w-4" />
				Delete
			</button>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Product</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{' '}
							<strong>&quot;{productTitle}&quot;</strong>? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isLoading}
							className="bg-red-600 hover:bg-red-700"
						>
							{isLoading ? 'Deleting...' : 'Delete'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
