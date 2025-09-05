import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogType = "" |
	"add_user" |
	"edit_user" |
	"delete_user" |
	"add_project" |
	"edit_project" |
	"delete_project" |
	"system_settings" |
	"approve_project" |
	"reject_project" |
	"bulk_action" |
	"project_update" |
	"logout" |
	"disburse_funds";

export type DialogPayload = {
	id: string;
	show: boolean;
	type: DialogType;
	data: Record<string, any> | null;
	action: ((payload?: any) => Promise<void> | void) | null;
	dismiss: (() => void) | null;
};

type UiState = {
	dialog: DialogPayload;
	pageTitle: string;
	sidebarCollapsed: boolean;
};

const initialState: UiState = {
	dialog: {
		id: "",
		show: false,
		type: "",
		action: null,
		data: null,
		dismiss: null,
	},
	pageTitle: "",
	sidebarCollapsed: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		changeDialog: (state, action: PayloadAction<Partial<DialogPayload>>) => {
			return {
				...state,
				dialog: { ...state.dialog, ...action.payload },
			};
		},
		changePageTitle: (state, action: PayloadAction<string>) => {
			return {
				...state,
				pageTitle: action.payload,
			};
		},
		toggleSidebar: (state) => {
			return {
				...state,
				sidebarCollapsed: !state.sidebarCollapsed,
			};
		},
		resetDialog: (state) => {
			return {
				...state,
				dialog: initialState.dialog,
			};
		},
	},
});

export const { changeDialog, changePageTitle, toggleSidebar, resetDialog } = uiSlice.actions;
export default uiSlice.reducer;
