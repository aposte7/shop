'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
	title: string;
	description?: string;
	backHref?: string;
	backText?: string;
	children?: ReactNode;
};

export default function SectionMessage({
	title,
	description,
	backHref = '/admin/products',
	backText = 'Back to dashboard',
	children,
}: Props) {
	return (
		<div>
			<div className="mb-6">
				<h1 className="text-3xl font-semibold">{title}</h1>
				{description && (
					<p className="mt-2 text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>

			{children}

			<div className="mt-4">
				<Link href={backHref} className="text-blue-600 hover:underline">
					{backText}
				</Link>
			</div>
		</div>
	);
}
