import getRecentDeveloperProjects from "@/services/projects/get-recent-developer-projects";
import useCustomNavigation from "@/hooks/use-navigation";
import { useQuery } from "@tanstack/react-query";

export default function useRecentDeveloperProjects() {
	const { params } = useCustomNavigation();
	const developer_id = params.id as string;

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["recent-developer-projects"],
		queryFn: () => getRecentDeveloperProjects({ developer_id }),
	});

	return {
		data,
		isFetching,
		isError,
		error,
	};
}
