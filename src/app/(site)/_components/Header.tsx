'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SearchInput from './SearchInput';
import { cn } from '@/lib/utils';

export default function Header() {
	const [showSearch, setShowSearch] = useState(false);
	return (
		<header className="sticky h-fit top-0 z-50 w-full  ">
			<div className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
					<Link
						href="/"
						className="flex items-center space-x-2 text-[26px] font-bold tracking-tight transition-colors hover:text-primary"
					>
						<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							ShopKoo
						</span>
					</Link>

					<div className="hidden md:flex md:w-full md:max-w-md">
						<SearchInput />
					</div>

					<div className="flex items-center gap-4">
						<Button
							onClick={() => setShowSearch((s) => !s)}
							variant="ghost"
							size="icon"
							className="md:hidden cursor-pointer"
						>
							<Search className="h-6 w-6" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="relative transition-colors text-red-500 hover:text-red-600"
							asChild
						>
							<Link href="/favorites">
								<Heart className="size-5" />
							</Link>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="relative transition-colors hover:text-primary"
							asChild
						>
							<Link href="/mycart">
								<ShoppingCart className="size-5" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => e.stopPropagation()}
				className={cn(
					'md:hidden bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 absolute w-full border-b  px-4 py-3 transition-all  duration-400 ease-in-out ',
					showSearch
						? 'opacity-100  top-full'
						: 'opacity-0 top-0 -z-10 '
				)}
			>
				<SearchInput />
			</div>
		</header>
	);
}
