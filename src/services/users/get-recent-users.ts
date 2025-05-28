import { variables } from "@/constants";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";
import { users } from "@/constants/data/users";

type Response = User[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/users/recent`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(users.slice(0, 5)), 2000);
	});
}

export default async function getRecentUsers(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production();
}
