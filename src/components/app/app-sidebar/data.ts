import {
	LayoutDashboard,
	Users,
	Building2,
	TrendingUp,
	UserCheck,
	BarChart3,
	Settings,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import * as React from "react";
import classNames from "classnames";

export type SidebarLink = {
	name: string;
	path: string;
	icon: React.ReactNode;
};

const IconContainer = (node: LucideIcon, isActiveIcon?: boolean) => {
	const cn = classNames("size-5", {
		"text-white": isActiveIcon,
	});
	return React.createElement(node, { className: cn });
};

export const sidebarLinks: SidebarLink[] = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: IconContainer(LayoutDashboard),
	},
	{
		name: "Users",
		path: "/users",
		icon: IconContainer(Users),
	},
	{
		name: "Projects",
		path: "/projects",
		icon: IconContainer(Building2),
	},
	{
		name: "Investments",
		path: "/investments",
		icon: IconContainer(TrendingUp),
	},
	// {
	// 	name: "Developers",
	// 	path: "/developers",
	// 	icon: IconContainer(UserCheck),
	// },
	// {
	// 	name: "Analytics",
	// 	path: "/analytics",
	// 	icon: IconContainer(BarChart3),
	// },
	// {
	// 	name: "Settings",
	// 	path: "/settings",
	// 	icon: IconContainer(Settings),
	// },
];
