import Investors from "@/features/investments/investors";
import useSeo from "@/hooks/use-seo";

export default function InvestorsPage() {
	useSeo({ pageTitle: "Investors " });
	return <Investors />;
}
