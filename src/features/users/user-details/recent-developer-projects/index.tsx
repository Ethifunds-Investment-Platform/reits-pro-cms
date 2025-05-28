import { CardContent } from "@/components/ui/card";

import ProjectsTable from "./projects-table";
import Render from "@/components/app/render";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useRecentDeveloperProjects from "./use-recent-developer-projects";

export default function RecentDeveloperProjects() {
	const { data, isFetching, isError, error } = useRecentDeveloperProjects();

	return (
		<CardContent className="space-y-4 min-h-[500px] flex flex-col">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">Recent Projects</h3>
				<Button variant="link" asChild>
					<Link to={`/projects?developer_id=${data?.[0]?.developer_id ?? ""}`}>View All</Link>
				</Button>
			</div>

			<Render isLoading={isFetching} isError={isError} error={error}>
				<ProjectsTable isEmpty={data?.length === 0} data={data ?? []} />
			</Render>
		</CardContent>
	);
}
