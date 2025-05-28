import * as React from "react";
import ApproveProjectDialog from "./approve-project-dialog";
import RejectProjectDialog from "./reject-project-dialog";
import ProjectUpdateDialog from "./project-update-dialog";

export default function ProjectDialogs() {
	return (
		<React.Fragment>
			<ApproveProjectDialog/>
			<RejectProjectDialog/>
			<ProjectUpdateDialog/>
		</React.Fragment>
	);
}
