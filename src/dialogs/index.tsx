import * as React from "react";
import ProjectDialogs from "./project-dialogs";
import LogoutDialog from "./logout-dialog";
import DisburseDialog from "./disburse-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<ProjectDialogs />
			<DisburseDialog />
			<LogoutDialog />
		</React.Fragment>
	);
}
