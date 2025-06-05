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
import { Eye, MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmptyData from "@/components/app/empty-data";
import { Investment } from "@/types/investment.types";
import { Link } from "react-router-dom";

type Props = {
	isEmpty: boolean;
	data: Investment[];
};

export default function ActiveInvestments({ isEmpty, data }: Props) {
	if (isEmpty) {
		return (
			<EmptyData
				title="No active investments found"
				text="No active investments found, all active investments would be shown here"
			/>
		);
	}

	const getStatusColor = (status: Investment["project"]["status"]) => {
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
						<TableHead>Project Name</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Amount Invested</TableHead>
						<TableHead>Expected ROI</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell className="font-medium">{item?.project?.name}</TableCell>
							<TableCell>
								{item?.project?.location?.state} {item?.project?.location?.country}
							</TableCell>
							<TableCell>
								{item?.project?.currency?.symbol} {item?.amount_invested?.toLocaleString()}
							</TableCell>
							<TableCell>{item?.project?.expected_roi}</TableCell>
							<TableCell>
								<Badge className={getStatusColor(item?.project?.status)}>
									{item?.project?.status}
								</Badge>
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
											<Link to={`/investments/${item.id}`}>
												<Eye className="h-4 w-4 mr-2" />
												View Investment
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
