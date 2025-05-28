import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin.layout";
import LoginPage from "./pages/auth/login";

// Dashboard Pages
import DashboardPage from "./pages/dashboard";
import ProjectsPage from "./pages/projects";
import UsersPage from "./pages/users";
import AnalyticsPage from "./pages/analytics";
import SettingsPage from "./pages/settings";
import InvestmentsPage from "./pages/investments";
import DevelopersPage from "./pages/developers";
import NotFoundPage from "./pages/not-found";

import * as React from "react";
import useInit from "./hooks/use-init";
import { useIsMobile } from "./hooks/use-mobile";
import MobileRestriction from "./components/prompts/mobile-restriction";
import RecoveryPage from "./pages/auth/recovery";
import ResetPasswordPage from "./pages/auth/reset-password";
import UserDetailsPage from "./pages/users/user-details";
import CreateProjectPage from "./pages/projects/create-projects";
import ProjectDetailsPage from "./pages/projects/project-details";
import InvestorsPage from "./pages/investments/investors";

const App = () => {
	useInit();
	const isMobile = useIsMobile();
	if (isMobile) {
		return <MobileRestriction />;
	}

	return (
		<React.Fragment>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					{/* Auth Routes */}
					<Route path="/" element={<LoginPage />} />
					<Route path="/recovery" element={<RecoveryPage />} />
					<Route path="/recovery/reset-password" element={<ResetPasswordPage />} />

					{/* Admin Dashboard Routes */}
					<Route element={<AdminLayout />}>
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/:id" element={<ProjectDetailsPage />} />
						<Route path="/projects/create" element={<CreateProjectPage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:id" element={<UserDetailsPage />} />
						<Route path="/investments" element={<InvestmentsPage />} />
						<Route path="/investments/:id/investors" element={<InvestorsPage />} />
						<Route path="/developers" element={<DevelopersPage />} />
						<Route path="/analytics" element={<AnalyticsPage />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Route>

					{/* 404 Route */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
