import CreateProject from "@/features/projects/create-project";
import useSeo from "@/hooks/use-seo";

export default function CreateProjectPage() {
	useSeo({ pageTitle: "Create Project" });
	return <CreateProject />;
}
