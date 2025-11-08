import { Star } from 'lucide-react';

type Props = {
	rating: number;
	size?: number;
	className?: string;
};

export default function Stars({ rating, size = 20, className = '' }: Props) {
	const full = Math.floor(rating);
	return (
		<div className={`flex gap-0 ${className}`} aria-hidden>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					size={size}
					className={`${
						i < full
							? 'text-yellow-400 fill-current'
							: 'text-gray-300'
					} ${className}`}
				/>
			))}
		</div>
	);
}
