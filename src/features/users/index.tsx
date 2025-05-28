import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TableFilters from "./users-table/table-filters";
import UsersTable from "./users-table";
import useUsers from "./use-users";
import Render from "@/components/app/render";
import TablePagination from "./users-table/table-pagination";
import AppContainer from "@/components/app/container/container";

export default function Users() {
	const { data, isFetching, isError, error } = useUsers();
	return (
		<AppContainer className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>All Users</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 min-h-[500px] flex flex-col">
					<TableFilters disabled={isFetching} />
					<Render isLoading={isFetching} isError={isError} error={error}>
						<UsersTable isEmpty={data?.docs.length === 0} data={data?.docs ?? []} />
						{data && <TablePagination {...data} />}
					</Render>
				</CardContent>
			</Card>
		</AppContainer>
	);
}
