import useCustomNavigation from "@/hooks/use-navigation";
import getAllActiveInvestments from "@/services/investments/get-active-investments";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export default function useActiveInvestments() {
	const { queryParams } = useCustomNavigation();
	const page = Number(queryParams.get("page") ?? 1);

	const queries = React.useMemo(
		() => queryParams.getQueries(["search", "status", "project_type"]),
		[queryParams]
	);

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["active-investments", queries],
		queryFn: () => getAllActiveInvestments({ ...queries, page }),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
