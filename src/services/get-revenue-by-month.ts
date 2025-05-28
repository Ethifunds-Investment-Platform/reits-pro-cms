import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	january: number;
	february: number;
	march: number;
	april: number;
	may: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
};

type Parameters = {
	year: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/revenue-by-month?year=${data.year}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					january: generateDigits(99999),
					february: generateDigits(99999),
					march: generateDigits(99999),
					april: generateDigits(99999),
					may: generateDigits(99999),
					june: generateDigits(99999),
					july: generateDigits(99999),
					august: generateDigits(99999),
					september: generateDigits(99999),
					october: generateDigits(99999),
					november: generateDigits(99999),
					december: generateDigits(99999),
				}),
			2000
		);
	});
}

export default async function getRevenueByMonth(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}
