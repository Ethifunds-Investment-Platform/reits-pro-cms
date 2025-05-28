import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import useRecentProjects from "./use-recent-projects";
import ProjectsTable from "../projects-table";
import Render from "@/components/app/render";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RecentProjects() {
	const { data, isFetching, isError, error } = useRecentProjects();
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center justify-between">
							Recent Projects
							<Button variant="link" asChild>
								<Link to="/projects">View All</Link>
							</Button>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Render isLoading={isFetching} isError={isError} error={error}>
						<ProjectsTable isEmpty={data?.length === 0} data={data ?? []} />
					</Render>
				</CardContent>
			</Card>
		</div>
	);
}
