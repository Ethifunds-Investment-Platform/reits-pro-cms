import AppDialog from "@/components/app/app-dialog";
import Render from "@/components/app/render";
import { Button } from "@/components/ui/button";
import ensureError from "@/lib/ensure-error";
import getProjectById from "@/services/projects/get-project-by-id";
import updateProjectStatus from "@/services/projects/update-project-status";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import * as React from "react";

import { toast } from "sonner";

export default React.memo(function ApproveProjectDialog() {
	const { dialog } = useAppSelector("ui");
	const { activeCurrency: currency } = useAppSelector("init");
	const [isLoading, setIsLoading] = React.useState(false);
	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "approve_project";
	}, [dialog.show, dialog.type]);

	const id = dialog.id;
	const queryClient = useQueryClient();

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["project-approval", id],
		queryFn: () => getProjectById({ project_id: id }),
		enabled: !!id && open,
	});

	const getDate = (date: string) =>
		new Date(date).toLocaleDateString("en-us", {
			dateStyle: "full",
		});

	const details = {
		name: data?.name,
		funding_goal: `${currency.symbol} ${Number(data?.funding_goal ?? "").toLocaleString()}`,
		expected_roi: `${data?.expected_roi}%`,
		tenor: `${data?.tenor_value} ${data?.tenor_unit}`,
		developer: data?.developer.name,
		date: getDate(data?.created_at ?? ""),
	};

	const close = () => {
		if (isLoading) return;
		ui.resetDialog();
	};

	const submit = async () => {
		if (!id) return toast.error("Project ID is required");
		setIsLoading(true);
		try {
			await updateProjectStatus({ project_id: id, status: "approved" });
			toast.success("Project approved successfully");
			queryClient.invalidateQueries({ queryKey: ["projects", "recent-developer-projects"] });
			close();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AppDialog
			open={open}
			onClose={close}
			title="Approve Project"
			titleClassName="text-center"
			description="Are you sure you want to approve this project?"
			containerClassName="bg-white min-h-96"
			footer={
				!isFetching && (
					<div className="flex justify-center w-full gap-10 pt-5">
						<Button variant="outline" className="w-1/2" onClick={close} disabled={isLoading}>
							Cancel
						</Button>
						<Button className="w-1/2" onClick={submit} disabled={isLoading}>
							{isLoading ? "Approving..." : "Approve"}
						</Button>
					</div>
				)
			}
		>
			<Render isLoading={isFetching} isError={isError} error={error}>
				<div className="flex flex-col gap-3">
					<div className="p-3 space-y-5 border rounded-lg bg-neutral-50">
						{Object.entries(details).map(([key, value]) => {
							return (
								<div
									key={key}
									className="flex items-center justify-between capitalize caption-standard text-neutral-700"
								>
									<span className="w-full">{key.split("_").join(" ")} </span>
									<span className="w-full">{value}</span>
								</div>
							);
						})}
					</div>
				</div>
			</Render>
		</AppDialog>
	);
});
