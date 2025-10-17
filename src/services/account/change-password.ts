import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	current_password: string;
	new_password: string;
};

type Response = {
	message: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post("/auth/account/password/change", data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ message: "Password changed successfully" });
		}, 1000);
	});
}

export default async function changePassword(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
