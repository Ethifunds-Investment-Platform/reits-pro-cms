import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/admin/admin-header";

import AuthGate from "@/config/auth-gate";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app/app-sidebar";
import Dialogs from "@/dialogs";

export default function AdminLayout() {
	return (
		<AuthGate>
			<SidebarProvider>
				{/* <div className="min-h-screen bg-gray-50 flex"> */}
				<AppSidebar />

				<main className="flex-1">
					<AdminHeader />
					<Outlet />
					<Dialogs />
				</main>
				{/* </div> */}
			</SidebarProvider>
		</AuthGate>
	);
}
