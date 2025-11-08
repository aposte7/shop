import ProductCard from '@/features/products/components/ProductCard';

export default function Page() {
	return (
		<main>
			<section
				className="px-26 py-10 gap-6 justify-between grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]
"
			>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</section>
		</main>
	);
}
