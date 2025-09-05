import * as React from "react";
import { useForm } from "react-hook-form";
import { sanitizeNumInput } from "@/lib/utils";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "@/hooks/use-toast";
import { useMemo } from "react";
import ensureError from "@/lib/ensure-error";
import disburseFundsOtp from "@/services/investments/disburse-funds-otp";
import disburseFunds from "@/services/investments/disburse-funds";
import { queryClient } from "@/main";

type InvestFormValues = {
	rio: string;
	otp: string;
};

export default function useDisburse() {
	const { dialog } = useAppSelector("ui");
	const { account } = useAppSelector("account");
	const { queryParams, params } = useCustomNavigation();
	const [isLoading, setIsLoading] = React.useState(false);
	const [otp, setOtp] = React.useState("");
	const [otpSent, setOtpSent] = React.useState(false);
	const { ui } = useActions();
	const project_id = params.id as string;

	const project = useMemo(() => dialog.data?.project, [dialog.data?.project]);

	const form = useForm<InvestFormValues>({
		defaultValues: {
			rio: "",
			otp: "",
		},
	});

	const watchRio = form.watch("rio");
	const numericAmount = React.useMemo(() => {
		return parseInt(watchRio?.replace(/,/g, "") || "0", 10);
	}, [watchRio]);

	const open = React.useMemo(
		() => dialog.show && dialog.type === "disburse_funds",
		[dialog.show, dialog.type]
	);

	const handleClose = React.useCallback(() => {
		ui.resetDialog();
		setOtp("");
		setOtpSent(false);
		form.reset();
	}, [ui]);

	const handleSendOtp = async () => {
		try {
			if (!account?.email) {
				toast({
					title: "Error",
					description: "You need to be signed in to send an OTP.",
					variant: "destructive",
				});
				return;
			}
			setIsLoading(true);

			await disburseFundsOtp({
				email: account?.email,
				project_id,
			});
			toast({
				title: "Success",
				description: "OTP sent to your email.",
			});
			setOtpSent(true);
		} catch (error) {
			const err = ensureError(error);
			toast({
				title: "Error",
				description: err.message,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = async () => {
		const otp = form.getValues("otp");
		if (!otpSent || !otp) {
			await handleSendOtp();
			return;
		}

		if (otp.length !== 6) {
			toast({
				title: "Error",
				description: "OTP must be 6 digits.",
				variant: "destructive",
			});
			return;
		}

		try {
			setIsLoading(true);
			if (!account?.id) {
				toast({
					title: "Error",
					description: "You need to be signed in to make an investment.",
					variant: "destructive",
				});
				return;
			}

			await disburseFunds({
				project_id,
				rio: numericAmount,
				otp,
			});
			toast({
				title: "Success",
				description: "Funds disbursed successfully.",
			});
			queryClient.invalidateQueries({ queryKey: ["active-investments"] });
			handleClose();
		} catch (error) {
			const err = ensureError(error);
			toast({
				title: "Error",
				description: err.message,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const formatAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeNumInput(e.target.value, false);
		if (value === "") {
			form.setValue("rio", "");
			return;
		}

		const numVal = parseInt(value, 10);
		if (!isNaN(numVal)) {
			form.setValue("rio", numVal.toLocaleString());
		}
	};

	const validateOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeNumInput(e.target.value, false);
		if (value === "") {
			form.setValue("otp", "");
			return;
		}

		form.setValue("otp", value);
	};

	return {
		open,
		project,
		form,
		handleClose,
		onSubmit,
		formatAmount,
		numericAmount,
		setOtp,
		otpSent,
		validateOtp,
		isLoading,
	};
}
