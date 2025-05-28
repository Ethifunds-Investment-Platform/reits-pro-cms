import { AdminUser } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountState = {
	account: AdminUser | null;
	isAuthenticated: boolean;
};

const initialState: AccountState = {
	account: null,
	isAuthenticated: false,
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		changeAccount: (state, action: PayloadAction<AdminUser | null>) => {
			return {
				...state,
				account: action.payload,
				isAuthenticated: !!action.payload,
			};
		},
		logout: (state) => {
			return {
				...state,
				account: null,
				isAuthenticated: false,
			};
		},
	},
});

export const { changeAccount, logout } = accountSlice.actions;
export default accountSlice.reducer;
