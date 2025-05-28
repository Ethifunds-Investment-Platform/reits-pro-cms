import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import useResetPassword from "./use-reset-password";

export default function ResetPassword() {
	const { formData, updateFormData, isLoading, handleSubmit } = useResetPassword();

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
					<CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
								New Password
							</label>
							<Input
								id="password"
								type="password"
								value={formData.password}
								onChange={(e) => updateFormData("password", e.target.value)}
								required
								placeholder="Enter your password"
							/>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full bg-navy-800 hover:bg-navy-700"
						>
							{isLoading ? "Resetting password..." : "Reset Password"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
