import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreHorizontal, Users } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmptyData from "@/components/app/empty-data";
import { Link } from "react-router-dom";
import { Project } from "@/types/project.types";
import truncate from "@/lib/truncate";

type Props = {
	isEmpty: boolean;
	data: Project[];
};

export default function InvestmentsTable({ isEmpty, data }: Props) {
	if (isEmpty) {
		return (
			<EmptyData
				title="No investments found"
				text="No investments found, all investments would be shown here"
			/>
		);
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "in-progress":
				return "bg-yellow-100 text-yellow-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "sold":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="border rounded-lg grow">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Project</TableHead>
						<TableHead>Developer</TableHead>
						<TableHead>Target Amount</TableHead>
						<TableHead>Raised</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Investors</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell className="font-medium " title={item.name}>
								{truncate(item.name, 25)}
							</TableCell>
							<TableCell title={item.developer.name}>{truncate(item.developer.name, 15)}</TableCell>
							<TableCell>
								{item.currency.symbol} {item.funding_goal.toLocaleString()}
							</TableCell>
							<TableCell>
								{item.currency.symbol} {item.amount_raised.toLocaleString()}
							</TableCell>
							<TableCell>
								<Badge className={getStatusColor(item.status)}>{item.status}</Badge>
							</TableCell>
							<TableCell>{item.total_investors.toLocaleString()}</TableCell>
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
												View Details
											</Link>
										</DropdownMenuItem>

										{item.total_investors > 0 && (
											<DropdownMenuItem asChild>
												<Link to={`/investments/${item.id}/investors`}>
													<Users className="h-4 w-4 mr-2" />
													View Investors
												</Link>
											</DropdownMenuItem>
										)}
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
