import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import usePasswordSection from "./use-password-section";

export default function PasswordSection() {
	const { formData, updateFormData, isLoading, handleSubmit } = usePasswordSection();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Change Password</CardTitle>
				<CardDescription>Update your password to keep your account secure</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
							Current Password
						</label>
						<Input
							id="current_password"
							type="password"
							value={formData.current_password}
							onChange={(e) => updateFormData("current_password", e.target.value)}
							required
							placeholder="Enter current password"
							disabled={isLoading}
						/>
					</div>
					<div>
						<label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
							New Password
						</label>
						<Input
							id="new_password"
							type="password"
							value={formData.new_password}
							onChange={(e) => updateFormData("new_password", e.target.value)}
							required
							placeholder="Enter new password (min. 8 characters)"
							disabled={isLoading}
						/>
					</div>
					<div>
						<label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
							Confirm New Password
						</label>
						<Input
							id="confirm_password"
							type="password"
							value={formData.confirm_password}
							onChange={(e) => updateFormData("confirm_password", e.target.value)}
							required
							placeholder="Re-enter new password"
							disabled={isLoading}
						/>
					</div>
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full bg-navy-800 hover:bg-navy-700"
					>
						{isLoading ? "Changing Password..." : "Change Password"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

