import AppContainer from "@/components/app/container/container";
import useCustomNavigation from "@/hooks/use-navigation";
import getUserById from "@/services/users/get-user-by-id";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Render from "@/components/app/render";
import ActiveInvestments from "./active-investments";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "./user-info";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentDeveloperProjects from "./recent-developer-projects";

export default function UserDetails() {
	const { params } = useCustomNavigation();

	const id = params.id as string;
	const { isFetching, isError, error, data } = useQuery({
		queryKey: ["user", id],
		queryFn: () => getUserById({ id }),
	});

	return (
		<AppContainer>
			<Button variant="outline" asChild>
				<Link to="/users" className="flex items-center gap-2 mb-4">
					<ArrowLeft className="h-4 w-4" />
					Back to Users
				</Link>
			</Button>
			<Card>
				<CardHeader>
					<CardTitle>User Details</CardTitle>
					<div className="flex items-center gap-2">
						<Render
							isLoading={isFetching}
							isError={isError}
							error={error}
							loadingComponent={<LoadingComponent />}
						>
							{data?.user && <UserInfo user={data.user} />}
						</Render>
					</div>
				</CardHeader>
				<Render isLoading={isFetching} isError={isError} error={error} loadingBoxClass="h-[400px]">
					{data?.user?.role === "investor" && (
						<CardContent className="space-y-4 min-h-[500px] flex flex-col">
							<h3 className="text-lg font-medium">Active Investments</h3>
							<ActiveInvestments
								isEmpty={data?.active_investments?.length === 0}
								data={data?.active_investments ?? []}
							/>
						</CardContent>
					)}
					{data?.user?.role === "developer" && <RecentDeveloperProjects />}
				</Render>
			</Card>
		</AppContainer>
	);
}

function LoadingComponent() {
	return (
		<>
			<Skeleton className="h-28 w-full" />
			<Skeleton className="h-28 w-full" />
		</>
	);
}
