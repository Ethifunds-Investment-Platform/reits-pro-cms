import * as React from "react";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";
import { z, ZodError } from "zod";
import setPin from "@/services/account/set-pin";
import resetPin from "@/services/account/reset-pin";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";

const setPinSchema = z.object({
	new_pin: z
		.string()
		.length(6, { message: "PIN must be exactly 6 digits" })
		.regex(/^\d+$/, { message: "PIN must contain only numbers" }),
	confirm_pin: z.string().length(6, { message: "PIN must be exactly 6 digits" }),
});

const resetPinSchema = z.object({
	current_pin: z.string().length(6, { message: "PIN must be exactly 6 digits" }),
	new_pin: z
		.string()
		.length(6, { message: "PIN must be exactly 6 digits" })
		.regex(/^\d+$/, { message: "PIN must contain only numbers" }),
	confirm_pin: z.string().length(6, { message: "PIN must be exactly 6 digits" }),
});

type SetPinSchema = z.infer<typeof setPinSchema>;
type ResetPinSchema = z.infer<typeof resetPinSchema>;

const initSet: SetPinSchema = {
	new_pin: "",
	confirm_pin: "",
};

const initReset: ResetPinSchema = {
	current_pin: "",
	new_pin: "",
	confirm_pin: "",
};

export default function usePinSection() {
	const { account } = useAppSelector("account");
	const { account: accountActions } = useActions();
	const [formData, setFormData] = React.useState<ResetPinSchema>(initReset);
	const [isLoading, setIsLoading] = React.useState(false);

	const hasPin = account?.has_pin || false;

	const updateFormData = (key: keyof ResetPinSchema, value: string) => {
		// Only allow numeric input and limit to 6 digits
		if (value.length <= 6 && /^\d*$/.test(value)) {
			setFormData((prev) => ({ ...prev, [key]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (hasPin) {
				// Reset PIN mode
				const formValues = resetPinSchema.parse(formData);

				// Check if new PIN is same as current PIN
				if (formValues.current_pin === formValues.new_pin) {
					toast({
						variant: "destructive",
						title: "Validation Error",
						description: "New PIN must be different from current PIN",
					});
					setIsLoading(false);
					return;
				}

				// Check if PINs match
				if (formValues.new_pin !== formValues.confirm_pin) {
					toast({
						variant: "destructive",
						title: "Validation Error",
						description: "New PIN and confirm PIN do not match",
					});
					setIsLoading(false);
					return;
				}

				// Call API
				const updatedUser = await resetPin({
					current_pin: formValues.current_pin,
					new_pin: formValues.new_pin,
				});

				// Update account state
				accountActions.changeAccount(updatedUser);

				toast({
					title: "Success",
					description: "PIN reset successfully",
				});
			} else {
				// Set PIN mode
				const formValues: SetPinSchema = {
					new_pin: formData.new_pin,
					confirm_pin: formData.confirm_pin,
				};

				const validatedValues = setPinSchema.parse(formValues);

				// Check if PINs match
				if (validatedValues.new_pin !== validatedValues.confirm_pin) {
					toast({
						variant: "destructive",
						title: "Validation Error",
						description: "PIN and confirm PIN do not match",
					});
					setIsLoading(false);
					return;
				}

				// Call API
				const updatedUser = await setPin({
					pin: validatedValues.new_pin,
				});

				// Update account state
				accountActions.changeAccount(updatedUser);

				toast({
					title: "Success",
					description: "PIN set successfully",
				});
			}

			// Reset form
			setFormData(initReset);
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
				title: hasPin ? "PIN reset failed" : "PIN setup failed",
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
		hasPin,
	};
}
