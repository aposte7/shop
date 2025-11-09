import ProductDetail from '@/app/(site)/_components/ProductDetail';

export default async function page({
	params,
}: {
	params: { productId: string };
}) {
	const { productId } = await params;

	return <ProductDetail productId={Number(productId)} />;
}
