import * as React from "react";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";
import { z, ZodError } from "zod";
import changePassword from "@/services/account/change-password";

const passwordSchema = z.object({
	current_password: z.string().min(1, { message: "Current password is required" }),
	new_password: z.string().min(8, { message: "New password must be at least 8 characters long" }),
	confirm_password: z.string().min(1, { message: "Please confirm your password" }),
});

type PasswordSchema = z.infer<typeof passwordSchema>;

const init: PasswordSchema = {
	current_password: "",
	new_password: "",
	confirm_password: "",
};

export default function usePasswordSection() {
	const [formData, setFormData] = React.useState<PasswordSchema>(init);
	const [isLoading, setIsLoading] = React.useState(false);

	const updateFormData = (key: keyof PasswordSchema, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Validate form data
			const formValues = passwordSchema.parse(formData);

			// Check if new password is same as current password
			if (formValues.current_password === formValues.new_password) {
				toast({
					variant: "destructive",
					title: "Validation Error",
					description: "New password must be different from current password",
				});
				setIsLoading(false);
				return;
			}

			// Check if passwords match
			if (formValues.new_password !== formValues.confirm_password) {
				toast({
					variant: "destructive",
					title: "Validation Error",
					description: "New password and confirm password do not match",
				});
				setIsLoading(false);
				return;
			}

			// Call API
			await changePassword({
				current_password: formValues.current_password,
				new_password: formValues.new_password,
			});

			toast({
				title: "Success",
				description: "Password changed successfully",
			});

			// Reset form
			setFormData(init);
		} catch (error) {
			if (error instanceof ZodError) {
				toast({
					variant: "destructive",
					title: "Validation Error",
					description: error.errors[0].message,
				});
				throw error;
			}
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Password change failed",
				description: errMsg,
			});
			throw error;
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
