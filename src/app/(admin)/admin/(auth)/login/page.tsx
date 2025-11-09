'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Page() {
	return (
		<div className="h-screen flex  items-center justify-center w-full bg-secondary/30">
			<div className="flex min-w-80 w-[33%] flex-col justify-center gap-10">
				<h1 className="text-3xl text-center font-bold">
					Welcome back to
					<span className="text-blue-500 "> ShopKoo</span>
				</h1>

				<Card className="">
					<CardHeader>
						<CardTitle>Login Page</CardTitle>
						<CardDescription>
							For demo purpose use <em>email</em> and{' '}
							<em>password</em> in the placeholder
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									{...register('email')}
								/>
								{errors.email && (
									<p className="text-sm text-red-600">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									{...register('password')}
								/>
								{errors.password && (
									<p className="text-sm text-red-600">
										{errors.password.message}
									</p>
								)}
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="rememberMe"
										{...register('rememberMe')}
									/>
									<Label
										htmlFor="rememberMe"
										className="text-sm font-normal"
									>
										Remember me
									</Label>
								</div>
								<p className="text-sm cursor-pointer hover:text-blue-400 transition-colors font-medium text-slate-700">
									Forgot password ?
								</p>
							</div>

							<Button type="submit" className="w-full">
								Sign In
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-gray-600">
							Don’t have an account?{' '}
							<a
								href="#"
								className="text-blue-600 hover:underline"
							>
								Sign up
							</a>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
