import React from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCookie from "@/hooks/use-cookie";
import { variables } from "@/constants";
import logoutAccount from "@/services/account/logout";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "@/hooks/use-toast";

export default function LogoutDialog() {
	const { dialog } = useAppSelector("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const { deleteCookie } = useCookie(variables.STORAGE.session, "");
	const { navigate } = useCustomNavigation();

	const { ui, account: accountActions } = useActions();
	const isOpen = React.useMemo(
		() => dialog.show && dialog.type === "logout",
		[dialog.show, dialog.type]
	);

	const handleClose = () => {
		if (isLoading) return;
		ui.resetDialog();
	};

	const handleLogoutConfirm = async () => {
		try {
			setIsLoading(true);
			await logoutAccount();
			deleteCookie();
			navigate("/", { replace: true });
			toast({
				title: "Logged out",
				description: "You have been logged out successfully",
			});
			accountActions.changeAccount({} as any);
			ui.resetDialog();
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to log out. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};



	return (
		<AlertDialog open={isOpen} onOpenChange={handleClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Logout</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to logout of your account?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={handleLogoutConfirm} className="bg-red-600 hover:bg-red-700">
						{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
