import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ProductTableError({
	onRetry,
}: {
	onRetry: () => void;
}) {
	return (
		<Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Failed to load products</AlertTitle>
			<AlertDescription className="flex items-center justify-between mt-2">
				<span>Something went wrong. Please try again.</span>
				<Button size="sm" variant="outline" onClick={onRetry}>
					<RefreshCw className="h-4 w-4 mr-2" />
					Retry
				</Button>
			</AlertDescription>
		</Alert>
	);
}
