import Recovery from "@/features/auth/recovery";
import useSeo from "@/hooks/use-seo";

export default function RecoveryPage() {
	useSeo({ pageTitle: "Admin Recovery" });
	return <Recovery />;
}
