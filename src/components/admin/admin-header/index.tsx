import { User } from "lucide-react";
import useAppSelector from "@/store/hooks";

export default function AdminHeader() {
	const { account } = useAppSelector("account");

	return (
		<header className="bg-white border-b border-gray-200 py-4 px-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center">
							<User className="h-4 w-4 text-white" />
						</div>
						<span className="text-sm font-medium text-gray-700">{account?.name || "Admin"}</span>
					</div>
				</div>
			</div>
		</header>
	);
}
