
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 text-center">
				<div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Page not found
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Sorry, we couldn't find the page you're looking for.
					</p>
				</div>
				<div>
					<Link to="/dashboard">
						<Button className="bg-navy-800 hover:bg-navy-700">
							<Home className="h-4 w-4 mr-2" />
							Go to Dashboard
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
