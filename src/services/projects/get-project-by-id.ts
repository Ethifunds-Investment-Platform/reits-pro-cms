import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Parameters = {
	project_id: string;
};

type Response = Project;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/projects/${data.project_id}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects[0]), 2000);
	});
}

export default async function getProjectById(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
