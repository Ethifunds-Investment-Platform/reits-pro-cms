import useCustomNavigation from "@/hooks/use-navigation";
import getAllUsers from "@/services/users/get-all-users";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export default function useUsers() {
	const { queryParams } = useCustomNavigation();
	const page = Number(queryParams.get("page") ?? 1);

	const queries = React.useMemo(
		() => queryParams.getQueries(["search", "role", "status"]),
		[queryParams]
	);

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["users", queries],
		queryFn: () => getAllUsers({ ...queries, page }),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
