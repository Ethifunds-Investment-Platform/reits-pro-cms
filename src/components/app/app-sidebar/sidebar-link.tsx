import { Link } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";
import { type SidebarLink } from "./data";
import classNames from "classnames";
import * as React from "react";

type SidebarLinkProps = SidebarLink & {
	currentPath: string;
	activeLink: string;
	setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};
export default React.memo(function SidebarLink(link: SidebarLinkProps) {
	const { icon, name, path, currentPath, activeLink, setActiveLink } = link;

	const isActive = React.useMemo(() => {
		const allPaths = [path];
		const formattedCurrentPath = currentPath.split("/");
		return (
			allPaths.some((pathPrefix) => {
				const formattedPath = pathPrefix.split("/");
				return formattedCurrentPath.slice(1).includes(formattedPath[formattedPath.length - 1]);
			}) || activeLink == name
		);
	}, [activeLink, currentPath, name, path]);

	const cn = classNames(
		"flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300",
		{
			"bg-navy-700 text-white": isActive,
			"text-gray-300 hover:bg-navy-700 hover:text-white": !isActive,
		}
	);

	return (
		<SidebarMenuItem
			className="list-none"
			onMouseOver={() => setActiveLink(name)}
			onMouseLeave={() => setActiveLink("")}
		>
			<SidebarMenuButton asChild className={cn}>
				<Link to={path}>
					{icon}
					<span>{name}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
});
