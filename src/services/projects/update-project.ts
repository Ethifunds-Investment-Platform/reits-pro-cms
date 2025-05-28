import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NewProject, Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Response = Project;

type Parameters = NewProject & { id: string };

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.patch(`/projects/${data.id}`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects[0]), 1000);
	});
}

export default async function updateProject(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
