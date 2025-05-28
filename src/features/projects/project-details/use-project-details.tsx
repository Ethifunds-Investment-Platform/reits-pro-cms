import useCustomNavigation from "@/hooks/use-navigation";
import getProjectById from "@/services/projects/get-project-by-id";
import { useQuery } from "@tanstack/react-query";

export default function useProjectDetails() {
	const { params } = useCustomNavigation();
	const project_id = params.id as string;

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["project-details", project_id],
		queryFn: () => getProjectById({ project_id }),
	});

	return { data, isFetching, isError, error };
}
