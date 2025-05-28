import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Response = Project[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/projects/recent`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects.slice(0, 5)), 2000);
	});
}

export default async function getRecentProjects(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production();
}
