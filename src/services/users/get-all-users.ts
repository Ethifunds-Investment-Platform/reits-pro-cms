import { variables } from "@/constants";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";
import { users } from "@/constants/data/users";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import buildQueryString from "@/lib/build-query-string";

type Parameters = PaginationQuery & {
	search?: string;
	role?: string;
	status?: string;
};

type Response = PaginatedResponse<User>;

export async function production(data: Parameters): Promise<Response> {
	const queryString = buildQueryString(data);
	const response = await axios.get(`/users?${queryString}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: users,
					totalDocs: users.length,
					limit: 10,
					page: 1,
					totalPages: 1,
					hasNextPage: false,
					nextPage: null,
					hasPrevPage: false,
					prevPage: null,
					pagingCounter: 1,
				}),
			2000
		);
	});
}

export default async function getAllUsers(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
