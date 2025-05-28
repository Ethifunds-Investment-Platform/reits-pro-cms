import getRecentUsers from "@/services/users/get-recent-users";
import { useQuery } from "@tanstack/react-query";

export default function useRecentUsers() {
	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["recent-users"],
		queryFn: () => getRecentUsers(),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
