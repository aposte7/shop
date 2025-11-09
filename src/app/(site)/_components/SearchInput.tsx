import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

type Props = {
	className?: string;
};
function SearchInput({ className = '' }: Props) {
	return (
		<div className={cn('relative w-full', className)}>
			<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search products..."
				className="h-10 w-full rounded-full border pl-10 pr-4 text-sm focus-visible:ring-primary/20"
			/>
		</div>
	);
}

export default SearchInput;
