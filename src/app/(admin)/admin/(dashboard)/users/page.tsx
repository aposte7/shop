import SectionMessage from '../_components/SectionMessage';

export default function AdminUsersPage() {
	return (
		<div className="min-h-screen flex  justify-center p-6">
			<div className="w-full max-w-3xl">
				<SectionMessage
					title="Users"
					description="This section will be implemented very soon. In the meantime, you can go back to the admin dashboard."
				>
					<div className="rounded-lg border bg-white p-6 shadow-sm">
						<p className="text-sm text-gray-600">
							No Users UI yet coming soon.
						</p>
					</div>
				</SectionMessage>
			</div>
		</div>
	);
}
