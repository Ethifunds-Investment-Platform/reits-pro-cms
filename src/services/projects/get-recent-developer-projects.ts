import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Parameters = {
	developer_id: string;
};
type Response = Project[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/projects/developer/${data.developer_id}/recent`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects.slice(0, 5)), 2000);
	});
}

export default async function getRecentDeveloperProjects(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
