import { variables } from "@/constants";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";
import { users } from "@/constants/data/users";
import { Investment } from "@/types/investment.types";
import { investments } from "@/constants/data/investment/investments";

type Parameters = {
	id: string;
};
type Response = {
	user: User;
	active_investments: Investment[];
};

export async function production({ id }: Parameters): Promise<Response> {
	const response = await axios.get(`/users/${id}`);
	return response.data.data;
}

export async function development({ id }: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		const user = users.find((user) => user.id === id) ?? users[0];
		setTimeout(
			() =>
				resolve({
					user,
					active_investments: investments.filter(
						(investment) => investment.investor.id === user.id
					),
				}),
			2000
		);
	});
}

export default async function getUserById(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development(data);
	return production(data);
}
