import Metrics from "./metrics";
import UsersChart from "./users-chart";
import RevenueChart from "./revenue-chart";
import RecentUsers from "../users/recent-users";
import AppContainer from "@/components/app/container/container";
import RecentProjects from "../projects/recent-projects";

export default function Dashboard() {
	return (
		<AppContainer className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-600">Overview of your platform metrics</p>
			</div>

			{/* Stats Cards */}
			<Metrics />

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<UsersChart />
				<RevenueChart />
			</div>
			<RecentUsers />
			<RecentProjects />
		</AppContainer>
	);
}
