
import { Building } from "lucide-react";

export default function AdminLogo() {
	return (
		<div className="flex items-center gap-3">
			<Building className="h-8 w-8 text-white" />
			<div>
				<h1 className="text-xl font-bold text-white">REITPro</h1>
				<p className="text-sm text-gray-300">Admin Panel</p>
			</div>
		</div>
	);
}
