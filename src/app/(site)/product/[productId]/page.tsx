type Props = { params: { productId: string } };

export default async function Page({ params }: Props) {
	const { productId } = await params;

	return (
		<main>
			<h1>{productId}</h1>
		</main>
	);
}
