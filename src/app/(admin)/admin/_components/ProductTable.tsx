'use client';
import { useMemo } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { toast } from 'sonner';
import { useGetProductsQuery } from '@/features/products/productsApi';

export default function ProductTable() {
	const { data } = useGetProductsQuery(
		{ limit: 100, skip: 0 },
		{ refetchOnMountOrArgChange: true }
	);

	const products = useMemo(() => data?.products ?? [], [data?.products]);
	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-20">Image</TableHead>
						<TableHead>Product</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-center cursor-pointer">
							Price{' '}
						</TableHead>
						<TableHead className="text-center cursor-pointer">
							Rating{' '}
						</TableHead>
						<TableHead className="text-center cursor-pointer">
							Stock{' '}
						</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-center py-8 text-gray-500"
							>
								No products found.
							</TableCell>
						</TableRow>
					) : (
						products.map((product) => (
							<TableRow
								key={product.id}
								className="hover:bg-gray-50"
							>
								<TableCell>
									<div className="relative w-16 h-16 rounded overflow-hidden border">
										<Image
											src={product.thumbnail}
											alt={product.title}
											fill
											className="object-cover"
										/>
									</div>
								</TableCell>
								<TableCell>
									<div>
										<p className="font-medium">
											{product.title}
										</p>
										<p className="text-sm text-gray-500">
											{product.brand}
										</p>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="secondary">
										{product.category}
									</Badge>
								</TableCell>
								<TableCell className="text-center">
									{product.discountPercentage > 0 ? (
										<div>
											<span className="font-bold text-green-600">
												$
												{(
													(product.price *
														(100 -
															product.discountPercentage)) /
													100
												).toFixed(2)}
											</span>
											<span className="text-sm text-gray-500 line-through ml-1">
												${product.price.toFixed(2)}
											</span>
										</div>
									) : (
										<span className="font-bold">
											${product.price.toFixed(2)}
										</span>
									)}
								</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center justify-center gap-1">
										<span className="font-medium">
											{product.rating}
										</span>
										<span className="text-yellow-500">
											star
										</span>
									</div>
								</TableCell>
								<TableCell className="text-center">
									<Badge
										variant={
											product.stock === 0
												? 'destructive'
												: product.stock <= 10
												? 'secondary'
												: 'default'
										}
									>
										{product.stock}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													size="sm"
													variant="ghost"
												>
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onSelect={() =>
														toast.info(
															`Edit ${product.title}`
														)
													}
												>
													<Edit className="w-4 h-4 mr-2" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onSelect={() =>
														toast.error(
															`Deleted ${product.title}`
														)
													}
													data-variant="destructive"
												>
													<Trash2 className="w-4 h-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
