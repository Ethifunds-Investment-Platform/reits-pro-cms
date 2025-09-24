import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { updateProjectFormSchema } from "./schema";
import updateProject from "@/services/projects/update-project";
import getProjectById from "@/services/projects/get-project-by-id";
import useAppSelector from "@/store/hooks";
import { DistributionFrequency, NewProject, ProjectType, TenorUnit } from "@/types/project.types";
import ensureError from "@/lib/ensure-error";
import {
	transformProjectToFormData,
	extractImageUrls,
	extractDocumentUrls,
} from "./utils/data-transformer";

type FormValues = z.infer<typeof updateProjectFormSchema>;

export function useUpdateProject() {
	const { account } = useAppSelector("account");
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = useState("basic-details");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [existingImages, setExistingImages] = useState<{
		displayImageUrl?: string;
		imageUrls: string[];
	}>({ imageUrls: [] });

	const [existingDocuments, setExistingDocuments] = useState<{
		project_memo?: string | null;
		developer_track_record?: string | null;
		market_analysis?: string | null;
		financial_projections?: string | null;
	}>({});
	const navigate = useNavigate();

	const form = useForm<FormValues>({
		resolver: zodResolver(updateProjectFormSchema),
		defaultValues: {
			name: "",
			description: "",
			type: "development" as ProjectType,
			display_image: undefined,
			location: {
				country: "",
				state: "",
				fullAddress: "",
			},
			risk_factors: "",
			property_highlights: "",
			currency_id: "",
			funding_goal: 0,
			expected_roi: 0,
			minimum_investment: 0,
			maximum_investment: 0,
			tenor_unit: "months" as TenorUnit,
			tenor_value: 12,
			distribution_frequency: "monthly" as DistributionFrequency,
			images: [],
		},
	});

	// Fetch and populate project data
	useEffect(() => {
		async function fetchProjectData() {
			if (!id) {
				toast.error("Project ID is required");
				navigate("/projects");
				return;
			}

			try {
				setIsLoading(true);
				const project = await getProjectById({ project_id: id });

				// Transform server data to form data
				const formData = transformProjectToFormData(project);

				// Reset form with the fetched data
				form.reset(formData);

				// Extract image URLs for display
				const imageData = extractImageUrls(project);
				setExistingImages(imageData);

				// Extract document URLs for display
				const documentData = extractDocumentUrls(project);
				setExistingDocuments(documentData);
			} catch (error) {
				const errMsg = ensureError(error).message;
				toast.error(`Failed to load project: ${errMsg}`);
				navigate("/projects");
			} finally {
				setIsLoading(false);
			}
		}

		fetchProjectData();
	}, [id, form, navigate]);

	const handleSubmit = async (values: FormValues) => {
		if (!account?.id) {
			toast.error("Please log in to update project");
			return;
		}

		if (!id) {
			toast.error("Project ID is required");
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert string fields to arrays
			const riskFactors = values.risk_factors
				?.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			const propertyHighlights = values.property_highlights
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			// Format the data to match the NewProject type with id
			const formattedData: NewProject & { id: string } = {
				id,
				name: values.name,
				description: values.description,
				type: values.type as ProjectType,
				display_image: values.display_image || (existingImages.displayImageUrl as any), // Will be handled by backend
				location: {
					country: values.location.country,
					state: values.location.state,
					fullAddress: values.location.fullAddress || "",
				},
				risk_factors: riskFactors || [],
				property_highlights: propertyHighlights,
				currency_id: values.currency_id,
				funding_goal: values.funding_goal,
				expected_roi: values.expected_roi,
				minimum_investment: values.minimum_investment,
				maximum_investment: values.maximum_investment || null,
				tenor_unit: values.tenor_unit as TenorUnit,
				tenor_value: values.tenor_value,
				distribution_frequency: values.distribution_frequency as DistributionFrequency,
				images: values.images || [],
				developer_id: account.id,
				funding_deadline: values.funding_deadline || null,
				project_memo: values.project_memo || null,
				developer_track_record: values.developer_track_record || null,
				market_analysis: values.market_analysis || null,
				financial_projections: values.financial_projections || null,
			};

			const projectResponse = await updateProject(formattedData);
			if (projectResponse) {
				toast.success("Project updated successfully! Redirecting to project page...");
				navigate(`/projects/${projectResponse.id}`);
			}
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Set up error handling for form
	const setupErrorHandling = () => {
		const subscription = form.watch(() => {
			const errors = form.formState.errors;
			// Only show errors when form is submitted
			if (form.formState.isSubmitted) {
				Object.entries(errors).forEach(([field, error]) => {
					if (error?.message) {
						toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${error.message}`, {
							id: `field-error-${field}`, // Prevent duplicate toasts
						});
					}
				});
			}
		});

		return subscription;
	};

	const tabs = ["basic-details", "location", "financial", "images", "analysis"];
	const goToNextTab = () => {
		const currentIndex = tabs.indexOf(activeTab);
		if (currentIndex < tabs.length - 1) {
			setActiveTab(tabs[currentIndex + 1]);
		}
	};

	const goToPreviousTab = () => {
		const currentIndex = tabs.indexOf(activeTab);
		if (currentIndex > 0) {
			setActiveTab(tabs[currentIndex - 1]);
		}
	};

	return {
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
		tabs: ["basic-details", "location", "financial", "images", "analysis"],
	};
}
