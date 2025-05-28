import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, TrendingUp, DollarSign } from "lucide-react";
import useMetrics from "./use-metrics";
import { figureConverter } from "@/lib/figure-converter";
import useAppSelector from "@/store/hooks";

export default function Metrics() {
	const { data, isFetching } = useMetrics();
	const { activeCurrency } = useAppSelector("init");

	const statsCards = [
		{
			title: "Total Users",
			value: data?.total_users.toLocaleString() ?? 0,
			icon: Users,
			color: "text-blue-600",
		},
		{
			title: "Active Projects",
			value: data?.active_projects.toLocaleString() ?? 0,

			icon: Building2,
			color: "text-green-600",
		},
		{
			title: "Total Investments",
			value: figureConverter(Number(data?.total_investments ?? 0), {
				currency: activeCurrency.code,
				precision: 2,
			}),

			icon: TrendingUp,
			color: "text-purple-600",
		},
		{
			title: "Revenue",
			value: figureConverter(Number(data?.revenue ?? 0), {
				currency: activeCurrency.code,
				precision: 2,
			}),

			icon: DollarSign,
			color: "text-yellow-600",
		},
	];
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{statsCards.map((stat) => {
				const Icon = stat.icon;
				return (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
							<Icon className={`h-4 w-4 ${stat.color}`} />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isFetching ? "..." : stat.value.toLocaleString()}
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
