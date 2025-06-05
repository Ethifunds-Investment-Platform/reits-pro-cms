import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { BankAccount } from "@/types/bank-account.types";
import { Copy } from "lucide-react";
import * as React from "react";

export default function BankDetails(account: BankAccount) {
	if (!account?.account_name) return null;
	const copy = async () => {
		try {
			const text = `Bank Name: ${account.bank_name}\nAccount Name: ${account.account_name}\nAccount Number: ${account.account_number}`;
			await navigator.clipboard.writeText(text);
			toast({
				title: "Account details copied to clipboard",
			});
		} catch (error) {
			toast({
				title: "Failed to copy account details",
			});
		}
	};
	return (
		<div className="flex-1">
			<h1 className="text-lg font-medium">Bank Details</h1>
			<div className="flex items-start justify-between p-4 border rounded-lg">
				{account ? (
					<React.Fragment>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<h4 className="font-medium">{account.bank_name}</h4>
							</div>
							<p
								className="text-sm text-muted-foreground line-clamp-1"
								title={account.account_name}
							>
								{account.account_name}
							</p>
							<p className="text-sm text-muted-foreground">{account.account_number}</p>
						</div>
						<Button variant="outline" size="icon" title="Copy Account details" onClick={copy}>
							<Copy />
						</Button>
					</React.Fragment>
				) : (
					<div className="flex-1">
						<h4 className="font-medium text-muted-foreground">No bank account found</h4>
						<p className="text-sm text-muted-foreground">
							This user has not added any bank accounts yet.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
