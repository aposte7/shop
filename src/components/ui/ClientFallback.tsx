import React from 'react';
import { Skeleton } from './skeleton';

export default function ClientFallback() {
	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-6">
				<Skeleton className="h-8 w-48 rounded-md" />
			</div>

			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="rounded-lg border p-4">
						<Skeleton className="w-full h-44 rounded-md mb-4" />
						<Skeleton className="w-2/3 h-4 mb-2" />
						<Skeleton className="w-1/3 h-4 mb-3" />
						<div className="flex items-center justify-between">
							<Skeleton className="w-24 h-9 rounded-md" />
							<Skeleton className="w-10 h-9 rounded-md" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
