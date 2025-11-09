import { Skeleton } from '@/components/ui/skeleton';

export default function ProductTableSkeleton() {
	return (
		<div className="space-y-4">
			{[...Array(5)].map((_, i) => (
				<div
					key={i}
					className="flex items-center gap-4 p-4 border rounded-lg"
				>
					<Skeleton className="h-16 w-16 rounded-lg" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-3 w-32" />
					</div>
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-12" />
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-8 w-8 rounded-full" />
				</div>
			))}
		</div>
	);
}
