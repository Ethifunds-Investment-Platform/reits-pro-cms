import getMetrics from "@/services/get-metrics";
import { useQuery } from "@tanstack/react-query";

export default function useMetrics() {
	const { data, isFetching,  } = useQuery({
		queryKey: ["metrics"],
		queryFn: () => getMetrics(),
	});

	return {
		data,
		isFetching,
	
	};
}
