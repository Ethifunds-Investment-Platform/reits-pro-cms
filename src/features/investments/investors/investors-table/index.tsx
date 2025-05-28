import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, User, Users } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmptyData from "@/components/app/empty-data";
import { Link } from "react-router-dom";
import truncate from "@/lib/truncate";
import { Investment } from "@/types/investment.types";

type Props = {
	isEmpty: boolean;
	data: Investment[];
};

export default function InvestorsTable({ isEmpty, data }: Props) {
	if (isEmpty) {
		return (
			<EmptyData
				title="No investors found"
				text="No investors found, all investors would be shown here"
			/>
		);
	}



	return (
		<div className="border rounded-lg grow">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Investor</TableHead>
						<TableHead>Amount Invested</TableHead>
						<TableHead>Investment ROI</TableHead>
						<TableHead>Expected Return</TableHead>
						<TableHead>Investment Date</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell className="font-medium " title={item?.investor?.name}>
								{truncate(item?.investor?.name, 25)}
							</TableCell>
							<TableCell>
								{item?.project?.currency?.symbol} {item.amount_invested.toLocaleString()}
							</TableCell>
							<TableCell>{item.project.expected_roi}</TableCell>
							<TableCell>
								{item.project.currency.symbol}
								{(item.project.expected_roi * item.amount_invested).toLocaleString()}
							</TableCell>
							<TableCell>
								{new Date(item.created_at).toLocaleDateString("default", { dateStyle: "medium" })}
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem asChild>
											<Link to={`/projects/${item.id}`}>
												<Eye className="h-4 w-4 mr-2" />
												View Project
											</Link>
										</DropdownMenuItem>

										<DropdownMenuItem asChild>
											<Link to={`/users/${item.investor.id}`}>
												<User className="h-4 w-4 mr-2" />
												View Investor
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
