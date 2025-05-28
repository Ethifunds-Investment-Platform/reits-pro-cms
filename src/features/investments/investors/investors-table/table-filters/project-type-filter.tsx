import SelectBox from "@/components/ui/form-input/select-box";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

type Props = {
	onChange: (key: string, value: string) => void;
	query: string;
};
export default React.memo(function ProjectTypeFilter({ onChange, query }: Props) {
	const { queryParams } = useCustomNavigation();

	const projectType = React.useMemo(
		() => queryParams.get("project_type") ?? query ?? "all",
		[query, queryParams]
	);

	const options = [
		{
			title: "All Projects",
			value: "all",
		},
		{
			title: "Completed",
			value: "completed",
		},
		{
			title: "Development",
			value: "development",
		},
	];

	return (
		<SelectBox
			name="project_type"
			value={projectType}
			options={options}
			onchange={(value) => onChange("project_type", value)}
		/>
	);
});
