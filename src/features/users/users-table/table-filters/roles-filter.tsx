import SelectBox from "@/components/ui/form-input/select-box";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

type Props = {
	onChange: (key: string, value: string) => void;
	query: string;
};
export default React.memo(function RolesFilter({ onChange, query }: Props) {
	const { queryParams } = useCustomNavigation();

	const role = React.useMemo(
		() => queryParams.get("role") ?? query ?? "all",
		[query, queryParams]
	);

	const options = [
		{
			title: "All Roles",
			value: "all",
		},
		{
			title: "Investor",
			value: "investor",
		},
		{
			title: "Developer",
			value: "developer",
		},
	];

	return (
		<SelectBox
			name="role"
			value={role}
			options={options}
			onchange={(value) => onChange("role", value)}
		/>
	);
});
