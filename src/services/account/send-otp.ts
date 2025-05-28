import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = Partial<{
	email: string;
}>;

type Response = void;

export async function production({ email }: Parameters): Promise<Response> {
	await axios.post(`/auth/send-otp`, { email });
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function sendOtp(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
