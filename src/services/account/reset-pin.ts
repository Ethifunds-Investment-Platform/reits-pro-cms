import { variables } from "@/constants";
import axios from "@/lib/axios";
import { AdminUser } from "@/types/user.types";

type Parameters = {
	current_pin: string;
	new_pin: string;
};

type Response = AdminUser;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.patch("/auth/account/pin/reset", data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: "adm_123",
				email: "admin@example.com",
				name: "Admin User",
				role: "admin",
				has_pin: true,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			});
		}, 1000);
	});
}

export default async function resetPin(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development(data);
	return production(data);
}

