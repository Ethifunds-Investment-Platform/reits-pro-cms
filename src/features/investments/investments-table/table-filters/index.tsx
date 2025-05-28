import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import useCustomNavigation from "@/hooks/use-navigation";
import buildQueryString from "@/lib/build-query-string";
import StatusFilter from "./status-filter";
import TableSearchBar from "./table-search-bar";
import ProjectTypeFilter from "./project-type-filter";

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
		setShowFilters(false);
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
								<StatusFilter onChange={addQuery} query={queries.status} />
								<ProjectTypeFilter onChange={addQuery} query={queries.project_type} />
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
	);
}
