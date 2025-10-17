import * as React from "react";
import { useForm } from "react-hook-form";
import { sanitizeNumInput } from "@/lib/utils";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "@/hooks/use-toast";
import { useMemo } from "react";
import ensureError from "@/lib/ensure-error";
import disburseFunds from "@/services/investments/disburse-funds";
import { queryClient } from "@/main";

type InvestFormValues = {
	rio: string;
	pin: string;
};

export default function useDisburse() {
	const { dialog } = useAppSelector("ui");
	const { account } = useAppSelector("account");
	const { queryParams, params } = useCustomNavigation();
	const [isLoading, setIsLoading] = React.useState(false);
	const { ui } = useActions();

	const hasPin = account?.has_pin || false;
	const project = useMemo(() => dialog.data?.project, [dialog.data?.project]);

	const form = useForm<InvestFormValues>({
		defaultValues: {
			rio: "",
			pin: "",
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
		form.reset();
	}, [ui]);

	const onSubmit = async () => {
		if (!project?.id) {
			toast({
				title: "Error",
				description: "Project not found.",
				variant: "destructive",
			});
			return;
		}

		if (!hasPin) {
			toast({
				title: "Error",
				description: "You need to set up a PIN before you can disburse funds.",
				variant: "destructive",
			});
			return;
		}

		const pin = form.getValues("pin");
		if (!pin || pin.length !== 6) {
			toast({
				title: "Error",
				description: "PIN must be exactly 6 digits.",
				variant: "destructive",
			});
			return;
		}

		try {
			setIsLoading(true);
			if (!account?.id) {
				toast({
					title: "Error",
					description: "You need to be signed in to disburse funds.",
					variant: "destructive",
				});
				return;
			}

			await disburseFunds({
				project_id: project.id,
				rio: numericAmount,
				pin,
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

	const validatePin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeNumInput(e.target.value, false);
		if (value === "") {
			form.setValue("pin", "");
			return;
		}

		// Limit to 6 digits
		if (value.length <= 6) {
			form.setValue("pin", value);
		}
	};

	return {
		open,
		project,
		form,
		handleClose,
		onSubmit,
		formatAmount,
		numericAmount,
		validatePin,
		isLoading,
		hasPin,
	};
}
