import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function page() {
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
						<div className="flex mt-4 flex-col gap-6">
							<div className="space-y-2">
								<Label id="email">
									Email
									<span className="text-red-400">*</span>
								</Label>
								<Input type="text" />
							</div>
							<div className="space-y-2">
								<Label id="password">
									Password
									<span className="text-red-400">*</span>
								</Label>
								<Input />
							</div>

							<div className="flex items-center justify-between">
								<div className="flex gap-3 items-center">
									<Input
										className="w-4 h-4"
										type="checkbox"
									/>
									<Label>Remember me</Label>
								</div>

								<p className="text-sm cursor-pointer hover:text-blue-400 transition-colors font-medium text-slate-700">
									Forgot password ?
								</p>
							</div>
							<div>
								<Button className="w-full"> Login</Button>
							</div>
						</div>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
