'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Package,
	ShoppingCart,
	Users,
	Settings,
	BarChart3,
	X,
	PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
	{ href: '/admin', label: 'Dashboard', icon: BarChart3 },
	{ href: '/admin/products', label: 'Products', icon: Package },
	{ href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
	{ href: '/admin/users', label: 'Users', icon: Users },
	{ href: '/admin/settings', label: 'Settings', icon: Settings },
] as const;

export default function Sidebar() {
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="z-50">
			<input
				id="sidebar-toggle"
				type="checkbox"
				className="peer hidden md:hidden"
			/>

			<aside
				className={cn(
					'hidden xl:flex xl:flex-col xl:fixed xl:inset-y-0 bg-white border-r border-slate-200 transition-all duration-300',
					isCollapsed ? 'w-23' : 'w-64'
				)}
			>
				<div className="flex items-center justify-between p-4 border-b border-slate-200">
					<Link href="/admin" className="flex items-center gap-2">
						<div className="grid h-8 w-8 place-items-center rounded-lg bg-black font-bold text-white shadow-sm">
							SK
						</div>
						{!isCollapsed && (
							<span className="text-xl font-bold text-slate-900 transition-opacity duration-200">
								ShopKoo
							</span>
						)}
					</Link>

					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="flex ml-2 h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
					>
						<PanelLeft />
					</button>
				</div>

				<nav className="flex-1 space-y-1 p-3">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
									isActive
										? 'bg-blue-500/50 text-primary ring-2 ring-blue-600/20'
										: 'text-slate-700 hover:bg-slate-200'
								)}
							>
								<Icon className="h-5 w-5 shrink-0" />
								{!isCollapsed && (
									<span className="transition-opacity duration-200">
										{item.label}
									</span>
								)}
							</Link>
						);
					})}
				</nav>
			</aside>

			<div
				className={cn(
					'hidden xl:block transition-all duration-300',
					isCollapsed ? 'w-20' : 'w-64'
				)}
			/>

			<label
				htmlFor="sidebar-toggle"
				className={cn(
					'pointer-events-none fixed inset-0 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 xl:hidden',
					'peer-checked:pointer-events-auto peer-checked:opacity-100'
				)}
			/>

			<aside
				className={cn(
					'fixed inset-y-0 left-0 w-72 -translate-x-full transform border-r border-slate-200 bg-white transition-transform duration-300 ease-out xl:hidden',
					'peer-checked:translate-x-0'
				)}
			>
				<div className="flex items-center justify-between border-b border-slate-200 p-4">
					<Link href="/admin" className="flex items-center gap-2">
						<div className="grid h-8 w-8 place-items-center rounded-lg bg-black font-bold text-white shadow-sm">
							SK
						</div>
						{!isCollapsed && (
							<span className="text-xl font-bold text-slate-900 transition-opacity duration-200">
								ShopKoo
							</span>
						)}
					</Link>
					<label
						htmlFor="sidebar-toggle"
						className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"
					>
						<X className="h-5 w-5 text-slate-600" />
					</label>
				</div>

				<nav className="space-y-1 p-3">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<label
								key={item.href}
								htmlFor="sidebar-toggle"
								className="block cursor-pointer"
							>
								<Link
									href={item.href}
									className={cn(
										'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
										isActive
											? 'bg-blue-500/50 text-primary ring-2 ring-blue-600/20'
											: 'text-slate-700 hover:bg-slate-200'
									)}
								>
									<Icon className="h-5 w-5 shrink-0" />
									<span>{item.label}</span>
								</Link>
							</label>
						);
					})}
				</nav>
			</aside>
		</div>
	);
}
