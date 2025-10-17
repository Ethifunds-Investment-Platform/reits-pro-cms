import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import usePinSection from "./use-pin-section";

export default function PinSection() {
	const { formData, updateFormData, isLoading, handleSubmit, hasPin } = usePinSection();

	return (
		<Card>
			<CardHeader>
				<CardTitle>{hasPin ? "Reset PIN" : "Set PIN"}</CardTitle>
				<CardDescription>
					{hasPin 
						? "Update your 6-digit PIN for secure operations" 
						: "Set up a 6-digit PIN for secure operations like fund disbursement"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{hasPin && (
						<div>
							<label htmlFor="current_pin" className="block text-sm font-medium text-gray-700 mb-1">
								Current PIN
							</label>
							<Input
								id="current_pin"
								type="password"
								value={formData.current_pin}
								onChange={(e) => updateFormData("current_pin", e.target.value)}
								required
								placeholder="Enter current PIN"
								disabled={isLoading}
								maxLength={6}
								inputMode="numeric"
							/>
						</div>
					)}
					<div>
						<label htmlFor="new_pin" className="block text-sm font-medium text-gray-700 mb-1">
							{hasPin ? "New PIN" : "PIN"}
						</label>
						<Input
							id="new_pin"
							type="password"
							value={formData.new_pin}
							onChange={(e) => updateFormData("new_pin", e.target.value)}
							required
							placeholder="Enter 6-digit PIN"
							disabled={isLoading}
							maxLength={6}
							inputMode="numeric"
						/>
					</div>
					<div>
						<label htmlFor="confirm_pin" className="block text-sm font-medium text-gray-700 mb-1">
							Confirm PIN
						</label>
						<Input
							id="confirm_pin"
							type="password"
							value={formData.confirm_pin}
							onChange={(e) => updateFormData("confirm_pin", e.target.value)}
							required
							placeholder="Re-enter PIN"
							disabled={isLoading}
							maxLength={6}
							inputMode="numeric"
						/>
					</div>
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full bg-navy-800 hover:bg-navy-700"
					>
						{isLoading ? (hasPin ? "Resetting PIN..." : "Setting PIN...") : (hasPin ? "Reset PIN" : "Set PIN")}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

