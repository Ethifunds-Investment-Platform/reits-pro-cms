import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "@/hooks/use-toast";
import getExportInvestorsDetails from "@/services/investments/get-export-investors-details";
import getProjectInvestors from "@/services/investments/get-project-investors";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
export default function useProjectInvestors() {
	const [isExporting, setIsExporting] = React.useState(false);
	const { params, queryParams } = useCustomNavigation();

	const investment_id = params.id as string;
	const search = queryParams.get("search") ?? "";

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["project-investors", investment_id, search],
		queryFn: () => getProjectInvestors({ investment_id, search }),
	});

	const exportCsv = async () => {
		if (data?.length === 0) return;
		try {
			setIsExporting(true);
			const response = await getExportInvestorsDetails({ investment_id });
			const blob = new Blob([response], { type: "text/csv" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `investors-${data?.[0]?.project?.name.toLocaleLowerCase().replace(/ /g, "_")}.csv`;
			a.click();
		} catch (error) {
			toast({
				title: "Failed to export investors",
				description: "Please try again",
			});
		} finally {
			setIsExporting(false);
		}
	};

	return {
		data,
		isFetching,
		isError,
		error,
		exportCsv,
		isExporting,
	};
}
