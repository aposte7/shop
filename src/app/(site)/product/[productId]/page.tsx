import ProductDetail from '@/features/products/components/ProductDetail';

export default async function page({
	params,
}: {
	params: { productId: string };
}) {
	const { productId } = await params;

	return <ProductDetail productId={Number(productId)} />;
}
