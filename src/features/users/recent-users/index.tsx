import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import useRecentUsers from "./use-recent-users";
import UsersTable from "../users-table";
import Render from "@/components/app/render";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RecentUsers() {
	const { data, isFetching, isError, error } = useRecentUsers();
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center justify-between">
							Recent Users
							<Button variant="link" asChild>
								<Link to="/users">View All</Link>
							</Button>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Render isLoading={isFetching} isError={isError} error={error}>
						<UsersTable isEmpty={data?.length === 0} data={data ?? []} />
					</Render>
				</CardContent>
			</Card>
		</div>
	);
}
