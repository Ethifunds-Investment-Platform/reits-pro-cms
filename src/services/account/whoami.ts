import { variables } from "@/constants";
import { admins } from "@/constants/data/admins";
import axios from "@/lib/axios";
import { AdminUser } from "@/types/user.types";

type Response = AdminUser;

export async function production(): Promise<Response> {
	const response = await axios.get(`/auth/whoami`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(admins[0]), 2000);
	});
}

export default async function whoami(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
