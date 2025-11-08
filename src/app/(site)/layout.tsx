import { ReactNode } from 'react';
import Header from './_components/Header';
function layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

export default layout;
