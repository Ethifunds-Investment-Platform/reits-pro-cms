import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppDialog from "@/components/app/app-dialog";
import useDisburse from "./use-disburse";
import ErrorBoundary from "@/components/app/error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

export default function DisburseDialog() {
	const {
		open,
		handleClose,
		onSubmit,
		formatAmount,
		project,
		form,
		isLoading,
		validatePin,
		hasPin,
	} = useDisburse();

	return (
		<ErrorBoundary>
			<AppDialog
				open={open}
				onClose={handleClose}
				title={`Disburse Funds`}
				description="Complete the form below to disburse funds"
			>
				<div className="space-y-6 py-4">
					{/* Project summary */}
					<div className="bg-gray-50 p-4 rounded-md">
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-gray-500">Location</p>
								<p className="font-medium">
									{project?.location?.state}, {project?.location?.country}
								</p>
							</div>
							<div>
								<p className="text-gray-500">Minimum Investment</p>
								<p className="font-medium">
									{project?.currency?.symbol}
									{project?.minimum_investment?.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-gray-500">Expected ROI</p>
								<p className="font-medium">{project?.expected_roi}% Annually</p>
							</div>
							<div>
								<p className="text-gray-500">Funding Progress</p>
								<p className="font-medium">
									{((project?.amount_raised / project?.funding_goal) * 100).toFixed(1)}%
								</p>
							</div>
						</div>
					</div>

					{!hasPin ? (
						<Alert variant="destructive">
							<AlertDescription>
								You need to set up a PIN before you can disburse funds.{" "}
								<Link to="/settings" className="underline font-medium" onClick={handleClose}>
									Go to Settings
								</Link>
							</AlertDescription>
						</Alert>
					) : (
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="rio"
									render={({ field }) => (
										<FormItem>
											<FormLabel>RIO Amount (%)</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter rio "
													onChange={(e) => formatAmount(e)}
													disabled={isLoading}
													type="number"
													max={100}
													inputMode="numeric"
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="pin"
									render={({ field }) => (
										<FormItem>
											<FormLabel>PIN</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter your 6-digit PIN"
													onChange={(e) => validatePin(e)}
													disabled={isLoading}
													inputMode="numeric"
													type="password"
													maxLength={6}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="w-full bg-navy-800 hover:bg-navy-700 text-white"
									disabled={isLoading}
								>
									{isLoading ? "Disbursing..." : "Disburse Funds"}
								</Button>
							</form>
						</Form>
					)}
				</div>
			</AppDialog>
		</ErrorBoundary>
	);
}
