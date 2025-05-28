import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Render from "@/components/app/render";
import AppContainer from "@/components/app/container/container";
import useProjectInvestors from "./use-investors";
import { Button } from "@/components/ui/button";
import InvestorsTable from "./investors-table";

export default function Investors() {
	const { data, isFetching, isError, error, exportCsv, isExporting } = useProjectInvestors();

	return (
		<AppContainer className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Investors - {data?.[0]?.project?.name}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 min-h-[500px] flex flex-col">
					<div className="flex justify-end">
						<Button onClick={exportCsv} disabled={isExporting}>
							{isExporting ? "Exporting..." : "Export CSV"}
						</Button>
					</div>
					<Render isLoading={isFetching} isError={isError} error={error}>
						<InvestorsTable isEmpty={data?.length === 0} data={data ?? []} />
					</Render>
				</CardContent>
			</Card>
		</AppContainer>
	);
}
