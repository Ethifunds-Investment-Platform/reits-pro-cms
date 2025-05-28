import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "./data";
import SidebarLink from "./sidebar-link";
import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";
import { Separator } from "@/components/ui/separator";
import AdminLogo from "@/components/admin/admin-logo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import useActions from "@/store/actions";

export default function AppSidebar() {
	const [activeLink, setActiveLink] = React.useState("");
	const [currentPath, setCurrentPath] = React.useState("");
	const { location } = useCustomNavigation();
	const { ui } = useActions();

	React.useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location]);
	const linkProps = {
		activeLink,
		setActiveLink,
		currentPath,
	};

	const handleLogout = () => {
		ui.changeDialog({
			show: true,
			type: "logout",
		});
	};
	return (
		<Sidebar className="pt-2 admin-sidebar h-full">
			<div className="px-4 py-1">
				<AdminLogo />
			</div>
			<Separator />
			<SidebarContent className="px-3 pt-5">
				<SidebarGroup>
					<SidebarGroupContent className="space-y-3">
						{sidebarLinks.map((item) => (
							<SidebarLink key={item.name} {...item} {...linkProps} />
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	);
}

{
	/* <SidebarGroup className={"pt-0"}>
	<SidebarGroupContent>
		<SidebarMenu>
			{links.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link href={item.href}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	</SidebarGroupContent>
</SidebarGroup>; */
}
