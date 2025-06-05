import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	investment_id: string;
};

type Response = string;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/investments/${data.investment_id}/investors/export`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("");
		}, 1000);
	});
}

export default async function getExportInvestorsDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
