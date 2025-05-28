import SelectBox from "@/components/ui/form-input/select-box";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

type Props = {
	onChange: (key: string, value: string) => void;
	query: string;
};
export default React.memo(function StatusFilter({ onChange, query }: Props) {
	const { queryParams } = useCustomNavigation();

	const status = React.useMemo(
		() => queryParams.get("status") ?? query ?? "all",
		[query, queryParams]
	);

	const options = [
		{
			title: "All Status",
			value: "all",
		},
		{
			title: "Active",
			value: "active",
		},
		{
			title: "Inactive",
			value: "inactive",
		},
	];

	return (
		<SelectBox
			name="status"
			value={status}
			options={options}
			onchange={(value) => onChange("status", value)}
		/>
	);
});
