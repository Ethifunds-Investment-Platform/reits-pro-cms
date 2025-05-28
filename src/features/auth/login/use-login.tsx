import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import useActions from "@/store/actions";
import useCookie from "@/hooks/use-cookie";
import { variables } from "@/constants";
import loginAdmin from "@/services/account/login-admin";
import ensureError from "@/lib/ensure-error";

export default function useLogin() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const { account } = useActions();
	const { setCookie } = useCookie(variables.STORAGE.session, "");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await loginAdmin({ email, password });
			setCookie(response.token);
			account.changeAccount(response.user);

			toast({
				title: "Login successful",
				description: "Welcome to REITPro Admin Panel",
			});

			navigate("/dashboard");
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: errMsg,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		isLoading,
		handleSubmit,
	};
}
