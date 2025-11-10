'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
	className?: string;
	placeholder?: string;
};

export default function SearchInput({
	className = '',
	placeholder = 'Search products...',
}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlSearch = searchParams.get('search') ?? '';
	const [input, setInput] = useState(urlSearch || '');
	const newParams = new URLSearchParams(searchParams);

	const handleSearch = () => {
		const trimmed = input.trim();
		newParams.delete('category');
		if (trimmed) newParams.set('search', trimmed);
		router.replace(`?${newParams.toString()}`);
	};

	const handleClear = () => {
		router.push('/products');

		setInput('');
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSearch();
	};

	return (
		<div className={cn('flex gap-2 w-full', className)}>
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="text"
					placeholder={placeholder}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyPress}
					className="h-10 w-full rounded-full border pl-10 pr-10 text-sm focus-visible:ring-primary/20"
				/>
				{input && (
					<button
						onClick={handleClear}
						className="absolute right-3 top-1/2 -translate-y-1/2"
					>
						<X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
					</button>
				)}
			</div>
			<Button
				onClick={handleSearch}
				className="h-10 px-4 cursor-pointer hover:bg-primary/80 rounded-full"
				variant="default"
			>
				<Search className="h-4 w-4" />
			</Button>
		</div>
	);
}
