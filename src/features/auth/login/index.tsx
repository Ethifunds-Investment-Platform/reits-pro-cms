import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import useLogin from "./use-login";
import { Link } from "react-router-dom";

export default function LoginFeature() {
	const { email, setEmail, password, setPassword, isLoading, handleSubmit } = useLogin();

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center gap-3 mb-4">
						<Building className="h-8 w-8 text-navy-800" />
						<div>
							<h1 className="text-xl font-bold text-navy-800">REITPro</h1>
							<p className="text-sm text-gray-600">Admin Panel</p>
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="admin@reitpro.com"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Enter your password"
							/>
						</div>
						<div className="flex flex-col gap-5 pt-5">
							<Button
								type="submit"
								disabled={isLoading}
								className="w-full bg-navy-800 hover:bg-navy-700"
							>
								{isLoading ? "Signing in..." : "Sign In"}
							</Button>

							<Link to="/recovery" className="text-sm text-gray-600 hover:text-gray-800 mx-auto">
								Forgot Password?
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
