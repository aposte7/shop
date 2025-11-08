'use client';

import { useState } from 'react';
import { Header } from './admin/_components/header';
import Sidebar from './admin/_components/sidebar';
import { cn } from '@/lib/utils';

function Layout({ children }: { children: React.ReactNode }) {
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
