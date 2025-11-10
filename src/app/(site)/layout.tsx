import { ReactNode } from 'react';
import Header from './_components/Header';
function layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className=" mt-7 xl:px-26 md:px-15 px-10 py-10">
				{children}
			</main>
		</>
	);
}

export default layout;
