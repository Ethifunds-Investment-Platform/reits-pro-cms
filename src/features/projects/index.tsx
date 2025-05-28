import { Button } from "@/components/ui/button";
import {  Plus } from "lucide-react";
import ProjectsTable from "./projects-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Render from "@/components/app/render";
import AppContainer from "@/components/app/container/container";
import TableFilters from "./projects-table/table-filters";
import TablePagination from "./projects-table/table-pagination";
import useProjects from "./use-projects";
import { Link } from "react-router-dom";

export default function ProjectsFeature() {
	const { data, isFetching, isError, error } = useProjects();

	return (
		<AppContainer className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center justify-between">
							Projects Management
							<Button  variant="ghost" asChild className="bg-primary text-primary-foreground">
								<Link to="/projects/create">
									<Plus className="h-4 w-4 mr-2" />
									Create Project
								</Link>
							</Button>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 min-h-[500px] flex flex-col">
					<TableFilters disabled={isFetching} />
					<Render isLoading={isFetching} isError={isError} error={error}>
						<ProjectsTable isEmpty={data?.docs.length === 0} data={data?.docs ?? []} />
						{data && <TablePagination {...data} />}
					</Render>
				</CardContent>
			</Card>
		</AppContainer>
	);
}
