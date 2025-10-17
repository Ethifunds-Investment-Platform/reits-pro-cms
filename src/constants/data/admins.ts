import { AdminUser } from "@/types/user.types";

export const admins: AdminUser[] = [
	{
		id: "admin-1",
		email: "admin@reitpro.com",
		name: "System Administrator",
		role: "admin" as const,
		has_pin: true,
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "admin-2",
		email: "support@reitpro.com",
		name: "Support Admin",
		role: "admin" as const,
		has_pin: true,
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
	},
];
