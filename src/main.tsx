import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import store from "./store/index.ts";
import { queryClientConfig } from "./config/query-client-config.ts";

const queryClient = new QueryClient(queryClientConfig);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
