import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import useRecovery from "./use-recovery";
import * as React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Recovery() {
	const {
		email,
		setEmail,
		isLoading,
		handleSendOtp,
		otpSent,
		otp,
		setOtp,
		isVerifying,
		handleVerifyOtp,
	} = useRecovery();

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
					<CardTitle className="text-2xl font-bold text-center">Recovery</CardTitle>
					<CardDescription className="text-center">
						Enter your email to receive a code to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp} className="space-y-4">
					{!otpSent ? (
						<React.Fragment>
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

								<Button
									type="submit"
									disabled={isLoading}
									className="w-full bg-navy-800 hover:bg-navy-700"
								>
									
									{isLoading ? "Sending code..." : "Send Code"}
								</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<InputOTP maxLength={4} onChange={(e) => setOtp(e)} value={otp} containerClassName="flex justify-center gap-2">
								<InputOTPGroup className="flex justify-center gap-5">
									<InputOTPSlot index={0} className="h-12 w-12 text-lg" />
									<InputOTPSlot index={1} className="h-12 w-12 text-lg" />
									<InputOTPSlot index={2} className="h-12 w-12 text-lg" />
									<InputOTPSlot index={3} className="h-12 w-12 text-lg" />
								</InputOTPGroup>
							</InputOTP>

							<Button
								type="submit"
								disabled={isVerifying}
								className="w-full bg-navy-800 hover:bg-navy-700"
								>
								{isVerifying ? "Verifying code..." : "Verify Code"}
							</Button>
						</React.Fragment>
					)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
