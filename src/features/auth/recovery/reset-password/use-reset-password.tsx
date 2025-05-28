import * as React from "react";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";
import { z } from "zod";
import resetPassword from "@/services/account/reset-password";
import useCustomNavigation from "@/hooks/use-navigation";

const resetPasswordSchema = z.object({
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const init: ResetPasswordSchema = {
	password: "",
};

export default function useResetPassword() {
	const [formData, setFormData] = React.useState<ResetPasswordSchema>(init);
	const [isLoading, setIsLoading] = React.useState(false);

	const { navigate, queryParams } = useCustomNavigation();

	const email = queryParams.get("email");
	const otp = queryParams.get("otp");

	const updateFormData = (key: keyof ResetPasswordSchema, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (!email || !otp) {
			toast({
				variant: "destructive",
				title: "Invalid email or OTP code",
				description: "Please enter a valid email and OTP code",
			});
			return;
		}

		try {
			const formValues = resetPasswordSchema.parse(formData);
			await resetPassword({
				email: email,
				new_password: formValues.password,
				token: otp,
			});

			toast({
				title: "Password reset successful",
				description: "Password reset successful",
			});

			navigate("/");
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Password reset failed",
				description: errMsg,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		formData,
		updateFormData,
		handleSubmit,
	};
}
