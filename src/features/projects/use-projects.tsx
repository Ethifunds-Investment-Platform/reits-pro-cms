import useCustomNavigation from "@/hooks/use-navigation";
import getAllProjects from "@/services/projects/get-all-projects";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export default function useProjects() {
	const { queryParams } = useCustomNavigation();
	const page = Number(queryParams.get("page") ?? 1);

	const queries = React.useMemo(
		() => queryParams.getQueries(["search", "status", "project_type"]),
		[queryParams]
	);

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["projects", queries],
		queryFn: () => getAllProjects({ ...queries, page }),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
