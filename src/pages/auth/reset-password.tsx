import ResetPassword from "@/features/auth/recovery/reset-password";
import useSeo from "@/hooks/use-seo";

export default function ResetPasswordPage() {
	useSeo({ pageTitle: "Admin Reset Password" });
	return <ResetPassword />;
}
