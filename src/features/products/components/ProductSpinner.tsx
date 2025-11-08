import { Spinner } from '@/components/ui/spinner';

export default function ProductSpinner() {
	return (
		<div className="w-fit mx-auto">
			<div className="py-8 gap items-center gap-4 justify-center inline-flex">
				<Spinner className="size-7 text-blue-600" />
				<span>loading product...</span>
			</div>
		</div>
	);
}
