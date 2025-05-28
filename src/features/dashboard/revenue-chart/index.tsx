import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import FilterByYear from "@/components/app/filters/filter-by-year";
import capitalize from "@/lib/capitalize";
import getRevenueByMonth from "@/services/get-revenue-by-month";
import Render from "@/components/app/render";
import { Skeleton } from "@/components/ui/skeleton";
import useAppSelector from "@/store/hooks";

export default function UsersChart() {
	const { activeCurrency } = useAppSelector('init');
	const { queryParams } = useCustomNavigation();

	const year = React.useMemo(
		() => queryParams.get("year") ?? new Date().getFullYear().toString(),
		[queryParams]
	);

	const {
		data: metric,
		isFetching,
		isError,
		error,
	} = useQuery({
		queryKey: ["revenue-by-month", year],
		queryFn: () => getRevenueByMonth({ year }),
	});

	const data = React.useMemo(() => {
		return metric
			? Object.entries(metric).map(([key, value]) => ({
					name: capitalize(key.slice(0, 3)),
					revenue: value,
			  }))
			: [];
	}, [metric]);

	const onChange = (value: string) => {
		queryParams.set("year", value);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between">
					Revenue Growth
					<FilterByYear name="year" value={year} onchange={onChange} />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<Skeleton className="h-[300px] w-full" />}
				>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip
								formatter={(value) => [`${activeCurrency.symbol}${value.toLocaleString()}`, "Revenue"]}
								labelStyle={{ color: "#1e3a8a" }}
							/>
							<Line
								type="monotone"
								dataKey="revenue"
								stroke="#1e3a8a"
								strokeWidth={2}
								dot={{ fill: "#1e3a8a" }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Render>
			</CardContent>
		</Card>
	);
}
