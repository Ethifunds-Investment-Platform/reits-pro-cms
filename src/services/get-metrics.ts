import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_users: number;
	active_projects: number;
	total_investments: number;
	revenue: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_users: generateDigits(99999),
					active_projects: generateDigits(999),
					total_investments: generateDigits(999999999),
					revenue: generateDigits(9999999999),
				}),
			2000
		);
	});
}

export default async function getMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production();
}
