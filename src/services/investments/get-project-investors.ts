import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Investment } from "@/types/investment.types";
import { investments } from "@/constants/data/investments";

type Parameters = {
	investment_id: string;
	search?: string;
};

type Response = Investment[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(
		`/admin/investments/${data.investment_id}/investors?search=${data.search}`
	);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(investments);
		}, 1000);
	});
}

export default async function getProjectInvestors(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
