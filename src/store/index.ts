import { configureStore } from "@reduxjs/toolkit";
import initSlice from "./init.slice";
import uiSlice from "./ui.slice";
import accountSlice from "./account.slice";

const store = configureStore({
	reducer: {
		account: accountSlice,
		ui: uiSlice,
		init: initSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["ui/changeDialog"],
				ignoredPaths: ["ui.dialog.action", "ui.dialog.dismiss"],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
