
import Projects from "@/features/projects";
import useSeo from "@/hooks/use-seo";

export default function ProjectsPage() {
	useSeo({ pageTitle: "Projects Management" });
	return <Projects />;
}
