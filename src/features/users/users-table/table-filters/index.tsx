import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import useCustomNavigation from "@/hooks/use-navigation";
import buildQueryString from "@/lib/build-query-string";
import RolesFilter from "./roles-filter";
import StatusFilter from "./status-filter";
import TableSearchBar from "./table-search-bar";

export default function TableFilters(props: { disabled: boolean }) {
	const [showFilters, setShowFilters] = React.useState(false);
	const [queries, setQueries] = React.useState<Record<string, string>>({});
	const { navigate } = useCustomNavigation();

	const addQuery = (key: string, value: string) => {
		setQueries((prev) => ({ ...prev, [key]: value }));
	};

	const resetFilters = () => {
		setQueries({});
		navigate(``);
	};

	const applyFilters = () => {
		const queryString = buildQueryString(queries);
		navigate(`?${queryString}`);
		setShowFilters(false);
	};

	return (
		<React.Fragment>
			<div className="flex items-center gap-4 mb-6 justify-between">
				<TableSearchBar />
				<Button
					variant="outline"
					onClick={() => setShowFilters(!showFilters)}
					disabled={props.disabled}
				>
					<Filter className="h-4 w-4 mr-2" />
					Filters
				</Button>
			</div>
			{showFilters && (
				<Card>
					<React.Fragment>
						<CardContent className="pt-6">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<RolesFilter onChange={addQuery} query={queries.role} />
								<StatusFilter onChange={addQuery} query={queries.status} />
								<div className="flex gap-2 col-span-2  flex justify-end">
									<Button variant="outline" className="" onClick={resetFilters}>
										Reset
									</Button>
									<Button className=" bg-navy-800 hover:bg-navy-700" onClick={applyFilters}>
										Apply
									</Button>
								</div>
							</div>
						</CardContent>
					</React.Fragment>
				</Card>
			)}
		</React.Fragment>

		// <Card>
		// 	<CardContent className="pt-6">
		// 		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
		// 			<Select>
		// 				<SelectTrigger>
		// 					<SelectValue placeholder="All Roles" />
		// 				</SelectTrigger>
		// 				<SelectContent>
		// 					<SelectItem value="all">All Roles</SelectItem>
		// 					<SelectItem value="investor">Investor</SelectItem>
		// 					<SelectItem value="developer">Developer</SelectItem>
		// 				</SelectContent>
		// 			</Select>

		// 			<Select>
		// 				<SelectTrigger>
		// 					<SelectValue placeholder="All Status" />
		// 				</SelectTrigger>
		// 				<SelectContent>
		// 					<SelectItem value="all">All Status</SelectItem>
		// 					<SelectItem value="active">Active</SelectItem>
		// 					<SelectItem value="inactive">Inactive</SelectItem>
		// 					<SelectItem value="suspended">Suspended</SelectItem>
		// 				</SelectContent>
		// 			</Select>

		// 			<Select>
		// 				<SelectTrigger>
		// 					<SelectValue placeholder="Registration Date" />
		// 				</SelectTrigger>
		// 				<SelectContent>
		// 					<SelectItem value="all">All Time</SelectItem>
		// 					<SelectItem value="today">Today</SelectItem>
		// 					<SelectItem value="week">This Week</SelectItem>
		// 					<SelectItem value="month">This Month</SelectItem>
		// 					<SelectItem value="year">This Year</SelectItem>
		// 				</SelectContent>
		// 			</Select>

		// <div className="flex gap-2">
		// 	<Button variant="outline" className="flex-1">
		// 		Reset
		// 	</Button>
		// 	<Button className="flex-1 bg-navy-800 hover:bg-navy-700">
		// 		Apply
		// 	</Button>
		// </div>
		// 		</div>
		// 	</CardContent>
		// </Card>
	);
}
