
import * as React from "react";
import useActions from "@/store/actions";

export default function useAuth() {
	const { account } = useActions();

	const getAdminUser = React.useCallback(async () => {
		// Mock admin user for demo - replace with actual API call
		const mockAdmin = {
			id: "admin-1",
			email: "admin@reitpro.com",
			name: "Admin User",
			role: "admin" as const,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		
		account.changeAccount(mockAdmin);
	}, [account]);

	React.useLayoutEffect(() => {
		getAdminUser();
	}, [getAdminUser]);
}
