
import { useEffect } from "react";

interface UseSeoProps {
	pageTitle: string;
	description?: string;
}

export default function useSeo({ pageTitle, description }: UseSeoProps) {
	useEffect(() => {
		document.title = `${pageTitle} | REITPro Admin`;
		
		if (description) {
			const metaDescription = document.querySelector('meta[name="description"]');
			if (metaDescription) {
				metaDescription.setAttribute("content", description);
			} else {
				const meta = document.createElement("meta");
				meta.name = "description";
				meta.content = description;
				document.head.appendChild(meta);
			}
		}
	}, [pageTitle, description]);
}
