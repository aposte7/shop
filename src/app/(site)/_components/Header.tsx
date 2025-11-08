'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<Link
					href="/"
					className="flex items-center space-x-2 text-2xl font-bold tracking-tight transition-colors hover:text-primary"
				>
					<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
						ShopKoo
					</span>
				</Link>

				<div className="hidden md:flex md:w-full md:max-w-md">
					<div className="relative w-full">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="h-10 w-full rounded-full border pl-10 pr-4 text-sm focus-visible:ring-primary/20"
						/>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" className="md:hidden">
						<Search className="h-6 w-6" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="relative transition-colors text-red-500 hover:text-red-600"
						asChild
					>
						<Link href="/favorites">
							<Heart className="h-5  w-5" />
						</Link>
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="relative transition-colors hover:text-primary"
						asChild
					>
						<Link href="/mycart">
							<ShoppingCart className="h-6 w-6" />
						</Link>
					</Button>
				</div>
			</div>

			<div className="md:hidden border-t bg-background px-4 py-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search products..."
						className="h-10 w-full rounded-full border pl-10 pr-4 text-sm"
					/>
				</div>
			</div>
		</header>
	);
}
