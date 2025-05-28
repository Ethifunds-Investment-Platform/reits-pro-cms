import ProjectsTable from "./investments-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Render from "@/components/app/render";
import AppContainer from "@/components/app/container/container";
import TableFilters from "./investments-table/table-filters";
import TablePagination from "./investments-table/table-pagination";
import useProjects from "./use-investments";

export default function ProjectsFeature() {
	const { data, isFetching, isError, error } = useProjects();

	return (
		<AppContainer className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Active Investments</CardTitle>
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
