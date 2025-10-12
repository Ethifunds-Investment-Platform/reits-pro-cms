import { useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AppContainer from "@/components/app/container/container";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormMessage,
	FormLabel,
	FormItem,
	FormField,
	FormControl,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import ProjectFormBasicDetails from "../create-project/tabs/basic-details";
import ProjectFormFinancialDetails from "../create-project/tabs/financial-details";
import ProjectFormImagesTab from "../create-project/tabs/images";
import ProjectFormLocationTab from "../create-project/tabs/location";
import ProjectFormAnalysisTab from "../create-project/tabs/analysis";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUpdateProject } from "./use-update-project";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Render from "@/components/app/render";

export default function UpdateProject() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const {
		form,
		activeTab,
		setActiveTab,
		isSubmitting,
		isLoading,
		existingImages,
		existingDocuments,
		handleSubmit,
		setupErrorHandling,
		goToNextTab,
		goToPreviousTab,
		tabs,
	} = useUpdateProject();

	// Setup form error handling
	useEffect(() => {
		const subscription = setupErrorHandling();
		return () => subscription.unsubscribe();
	}, [setupErrorHandling]);

	return (
		<AppContainer>
			<Render isLoading={isLoading}>
				<div className="mb-8">
					<div className="flex items-center gap-4 mb-6">
						<Button variant="outline" size="sm" asChild>
							<Link to={`/projects/${id}`}>
								<ArrowLeft className="h-4 w-4 mr-1" />
								Back to Project
							</Link>
						</Button>
					</div>

					<h1 className="text-2xl font-bold text-navy-800">Update Project</h1>
					<p className="text-gray-600 mt-2">
						Update the details of your property development project
					</p>
				</div>

				<Card className="space-y-6">
					<Form {...form}>
						<form id="project-form" onSubmit={form.handleSubmit(handleSubmit)}>
							<div className="flex justify-between px-5 pt-3">
								<Button
									type="submit"
									form="project-form"
									disabled={isSubmitting}
									className="bg-navy-800 hover:bg-navy-700"
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										<>
											<Save className="mr-2 h-4 w-4" />
											Update Project
										</>
									)}
								</Button>
							</div>
							<CardContent className="p-6">
								<Tabs value={activeTab} onValueChange={setActiveTab}>
									<TabsList className="flex gap-3 lg:grid grid-cols-5 mb-8 overflow-auto justify-start">
										<TabsTrigger value="basic-details">Basic Details</TabsTrigger>
										<TabsTrigger value="location">Location</TabsTrigger>
										<TabsTrigger value="financial">Financial Details</TabsTrigger>
										<TabsTrigger value="images">Images</TabsTrigger>
										<TabsTrigger value="analysis">Analysis</TabsTrigger>
									</TabsList>

									<ProjectFormBasicDetails form={form} />

									<ProjectFormLocationTab form={form} />

									<ProjectFormFinancialDetails form={form} />

									<ProjectFormImagesTab form={form} existingImages={existingImages} />

									<ProjectFormAnalysisTab form={form} existingDocuments={existingDocuments} />
								</Tabs>
							</CardContent>
						</form>
					</Form>

					<CardFooter className="flex justify-between pt-4 border-t mx-6">
						{activeTab !== "basic-details" && (
							<Button type="button" variant="outline" onClick={goToPreviousTab}>
								Previous
							</Button>
						)}

						<div className="ml-auto flex space-x-2">
							<Button type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)}>
								Cancel
							</Button>

							{activeTab !== "analysis" ? (
								<Button type="button" onClick={goToNextTab}>
									Next
								</Button>
							) : null}
						</div>
					</CardFooter>
				</Card>
			</Render>
		</AppContainer>
	);
}
