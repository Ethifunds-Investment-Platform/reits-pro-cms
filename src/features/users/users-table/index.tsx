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
import { User } from "@/types/user.types";
import EmptyData from "@/components/app/empty-data";
import { Link } from "react-router-dom";

type Props = {
	isEmpty: boolean;
	data: User[];
};

export default function UsersTable({ isEmpty, data }: Props) {
	if (isEmpty) {
		return (
			<EmptyData title="No users found" text="No users found, all users would be shown here" />
		);
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "inactive":
				return "bg-gray-100 text-gray-800";
			case "suspended":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "investor":
				return "bg-blue-100 text-blue-800";
			case "developer":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="border rounded-lg grow">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Created</TableHead>
						<TableHead>Last Login</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Badge className={getRoleColor(user.role)}>{user.role}</Badge>
							</TableCell>
							<TableCell>
								<Badge className={getStatusColor(user.status)}>{user.status}</Badge>
							</TableCell>
							<TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
							<TableCell>
								{user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
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
											<Link to={`/users/${user.id}`}>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Link>
										</DropdownMenuItem>
										{/* <DropdownMenuItem>
											<Edit className="h-4 w-4 mr-2" />
											Edit User
										</DropdownMenuItem>
										<DropdownMenuItem className="text-red-600">
											<Trash2 className="h-4 w-4 mr-2" />
											Delete User
										</DropdownMenuItem> */}
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
