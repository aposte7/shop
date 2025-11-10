import { ReactNode, Suspense } from 'react';
import Header from './_components/Header';
import ClientFallback from '@/components/ui/ClientFallback';

function layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Suspense
				fallback={
					<div className="w-full">
						<ClientFallback />
					</div>
				}
			>
				<Header />
			</Suspense>
			<main className=" mt-7 xl:px-30 md:px-15 px-10 py-10">
				{children}
			</main>
		</>
	);
}

export default layout;
