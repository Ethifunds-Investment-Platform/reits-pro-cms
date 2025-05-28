import * as React from "react";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";
import sendOtp from "@/services/account/send-otp";
import verifyOtp from "@/services/account/verify-otp";
import useCustomNavigation from "@/hooks/use-navigation";

export default function useRecovery() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [otp, setOtp] = React.useState("");
	const [otpSent, setOtpSent] = React.useState(false);
	const [isVerifying, setIsVerifying] = React.useState(false);

	const { navigate } = useCustomNavigation();

	const handleSendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await sendOtp({ email });

			toast({
				title: "OTP code sent",
				description: "Check your email for the OTP code",
			});

			setOtpSent(true);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: errMsg,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length !== 4) {
			toast({
				variant: "destructive",
				title: "Invalid OTP code",
				description: "Please enter a valid OTP code",
			});
			return;
		}

		setIsVerifying(true);
		try {
			await verifyOtp({ email, otp_code: otp });

			toast({
				title: "OTP code verified",
				description: "OTP code verified successfully",
			});

			navigate(`/recovery/reset-password?email=${email}&otp=${otp}`);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Verification failed",
				description: errMsg,
			});
		} finally {
			setIsVerifying(false);
		}
	};
	return {
		email,
		setEmail,
		password,
		setPassword,
		isLoading,
		handleSendOtp,
		otpSent,
		otp,
		setOtp,
		isVerifying,
		setIsVerifying,
		handleVerifyOtp,
	};
}
