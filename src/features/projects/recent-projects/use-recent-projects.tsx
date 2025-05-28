import getRecentProjects from "@/services/projects/get-recent-projects";
import { useQuery } from "@tanstack/react-query";

export default function useRecentProjects() {
	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["recent-projects"],
		queryFn: () => getRecentProjects(),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
