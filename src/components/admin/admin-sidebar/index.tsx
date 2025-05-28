import { Link, useLocation } from "react-router-dom";
import { 
	LayoutDashboard, 
	Users, 
	Building2, 
	TrendingUp, 
	UserCheck, 
	BarChart3, 
	Settings,
	LogOut
} from "lucide-react";
import AdminLogo from "../admin-logo";
import { Button } from "@/components/ui/button";
import useActions from "@/store/actions";

const sidebarItems = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Users",
		path: "/users",
		icon: Users,
	},
	{
		name: "Projects",
		path: "/projects",
		icon: Building2,
	},
	{
		name: "Investments",
		path: "/investments",
		icon: TrendingUp,
	},
	{
		name: "Developers",
		path: "/developers",
		icon: UserCheck,
	},
	{
		name: "Analytics",
		path: "/analytics",
		icon: BarChart3,
	},
	{
		name: "Settings",
		path: "/settings",
		icon: Settings,
	},
];

export default function AdminSidebar() {
	const location = useLocation();
	const { account } = useActions();

	const handleLogout = () => {
		account.logout();
	};

	return (
		<div className="admin-sidebar w-64 flex flex-col fixed top-0 left-0 h-full">
			<div className="p-6">
				<AdminLogo />
			</div>
			
			<nav className="flex-1 px-4">
				<ul className="space-y-2">
					{sidebarItems.map((item) => {
						const isActive = location.pathname === item.path;
						const Icon = item.icon;
						
						return (
							<li key={item.path}>
								<Link
									to={item.path}
									className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
										isActive
											? "bg-navy-700 text-white"
											: "text-gray-300 hover:bg-navy-700 hover:text-white"
									}`}
								>
									<Icon className="h-5 w-5" />
									<span>{item.name}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-4 border-t border-navy-700">
				<Button
					onClick={handleLogout}
					variant="ghost"
					className="w-full text-gray-300 hover:bg-navy-700 hover:text-white justify-start"
				>
					<LogOut className="h-5 w-5 mr-3" />
					Logout
				</Button>
			</div>
		</div>
	);
}
