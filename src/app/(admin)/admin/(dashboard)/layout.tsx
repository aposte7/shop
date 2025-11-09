'use client';

import { cn } from '@/lib/utils';
import Sidebar from './_components/sidebar';
import { Header } from './_components/header';
import { useProtectedRoute } from '@/features/auth/hooks/useProtectedRoutes';

function Layout({ children }: { children: React.ReactNode }) {
	useProtectedRoute();
	return (
		<div className="flex h-screen bg-gray-50 ">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main
					className={cn(
						'flex-1 overflow-y-auto bg-gray-50  p-4 md:p-6',
						'transition-all duration-300'
					)}
				>
					{children}
				</main>
			</div>
		</div>
	);
}

export default Layout;
