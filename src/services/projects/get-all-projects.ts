import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import buildQueryString from "@/lib/build-query-string";

type Parameters = PaginationQuery & {
	developer_id?: string;
	search?: string;
	status?: string;
	project_type?: string;
};

type Response = PaginatedResponse<Project>;

export async function production(data: Parameters): Promise<Response> {
	const queryString = buildQueryString(data);
	const response = await axios.get(`/projects?${queryString}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: projects,
					totalDocs: projects.length,
					limit: 10,
					page: 1,
					totalPages: 1,
					hasNextPage: false,
					nextPage: null,
					hasPrevPage: false,
					prevPage: null,
					pagingCounter: 1,
				}),
			1000
		);
	});
}

export default async function getAllProjects(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
