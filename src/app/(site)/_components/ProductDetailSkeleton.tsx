import { Skeleton } from '@/components/ui/skeleton';

function ProductDetailSkeleton() {
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-8">
			<Skeleton className="h-10 w-20 mb-6" />

			<div className="flex flex-wrap gap-10">
				<div className="flex-1 space-y-4 min-w-[300px]">
					<Skeleton className="w-full h-96 md:h-[500px] rounded-2xl" />
					<div className="flex gap-2">
						{[...Array(4)].map((_, i) => (
							<Skeleton
								key={i}
								className="w-24 h-24 rounded-lg"
							/>
						))}
					</div>
				</div>

				<div className="flex-1 space-y-5 min-w-[300px]">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>
		</div>
	);
}

export default ProductDetailSkeleton;
