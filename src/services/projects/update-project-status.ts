import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";

type Parameters = {
	project_id: string;
	status: Project["status"];
	reason?: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.patch(`/projects/${data.project_id}/status`, {
		status: data.status,
		reason: data.reason,
	});
	return response.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 1000);
	});
}

export default async function updateProjectStatus(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
