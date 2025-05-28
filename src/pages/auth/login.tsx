
import LoginFeature from "@/features/auth/login";
import useSeo from "@/hooks/use-seo";

export default function LoginPage() {
	useSeo({ pageTitle: "Admin Login" });
	return <LoginFeature />;
}
