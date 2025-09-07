import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	email: string;
	project_id: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/investments/disburse/otp`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 1000);
	});
}

export default async function disburseFundsOtp(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
