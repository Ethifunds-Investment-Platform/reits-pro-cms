
import { variables } from "@/constants";
import { admins } from "@/constants/data/admins";
import axios from "@/lib/axios";
import { AdminUser } from "@/types/user.types";

type Parameters = {
	email: string;
	password: string;
};

type Response = {
	user: AdminUser;
	token: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/login`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					user: admins[0],
					token: "admin_token_12345",
				}),
			1000
		);
	});
}

export default async function loginAdmin(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
