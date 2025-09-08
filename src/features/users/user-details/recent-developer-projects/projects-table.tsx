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
import { Check, Eye, MoreHorizontal, Users, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmptyData from "@/components/app/empty-data";
import { Link } from "react-router-dom";
import { Project } from "@/types/project.types";
import useActions from "@/store/actions";
import truncate from "@/lib/truncate";
import * as React from "react";

type Props = {
	isEmpty: boolean;
	data: Project[];
};

export default function ProjectsTable({ isEmpty, data }: Props) {
	const { ui } = useActions();
	if (isEmpty) {
		return (
			<EmptyData
				title="No projects found"
				text="No projects found, all projects would be shown here"
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



	const updateStatus = async (id: string, status: "approve_project" | "reject_project") => {
		ui.changeDialog({
			id,
			type: status,
			show: true,
		});
	};

	return (
		<div className="border rounded-lg grow">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Project</TableHead>
						{/* <TableHead>Developer</TableHead> */}
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
							{/* <TableCell title={item.developer.name}>{truncate(item.developer.name, 15)}</TableCell> */}
							<TableCell>
								{item.currency.symbol} {item.funding_goal?.toLocaleString()}
							</TableCell>
							<TableCell>
								{item.currency.symbol} {item.amount_raised?.toLocaleString()}
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

										{item.status === "pending" && (
											<React.Fragment>
												<DropdownMenuItem asChild className="w-full justify-start">
													<Button
														variant="ghost"
														// size="sm"
														className="text-green-600"
														onClick={() => updateStatus(item.id, "approve_project")}
													>
														<Check className="h-4 w-4" />
														Approve
													</Button>
												</DropdownMenuItem>

												<DropdownMenuItem asChild className="w-full justify-start">
													<Button
														variant="ghost"
														// size="sm"
														className="text-red-600"
														onClick={() => updateStatus(item.id, "reject_project")}
													>
														<X className="h-4 w-4" />
														Reject
													</Button>
												</DropdownMenuItem>
											</React.Fragment>
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
