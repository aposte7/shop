import ProductForm from '../../_components/ProductForm';
import ReturnButton from '../../_components/ReturnButton';

export default function AddProductPage() {
	return (
		<section className="w-full">
			<div>
				<ReturnButton />
				<div className="flex flex-col max-w-3xl px-6 gap-2">
					<h1 className="text-2xl font-semibold flex items-center gap-2">
						Add New Product
					</h1>
					<p className=" text-muted-foreground ">
						Create a new product to appear in the store catalog.
						Fill in the fields below and click &quot;Add
						Product&quot; when ready.
					</p>
				</div>
			</div>

			<div className="py-6 w-full flex justify-center items-center">
				<ProductForm />
			</div>
		</section>
	);
}
