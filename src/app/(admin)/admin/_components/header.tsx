'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Menu } from 'lucide-react';

export function Header() {
	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
			<div className="flex items-center justify-between px-4 py-3">
				<div className="border-b border-gray-200 bg-white xl:hidden">
					<div className="container-responsive flex items-center gap-3 py-3">
						<label
							htmlFor="sidebar-toggle"
							className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
							aria-label="Open menu"
						>
							<Menu className="h-5 w-5" />
						</label>
					</div>
				</div>

				<div className="flex w-fit ml-auto gap-4 justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-8 w-8 border border-slate-400 rounded-full"
							>
								<Avatar className="h-8 w-8">
									<AvatarFallback>A</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56"
							align="end"
							forceMount
						>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium">
										Admin User
									</p>
									<p className="text-xs text-muted-foreground">
										admin@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-600">
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="ghost" size="icon">
						<Bell className="w-5 h-5" />
					</Button>
				</div>
			</div>
		</header>
	);
}
