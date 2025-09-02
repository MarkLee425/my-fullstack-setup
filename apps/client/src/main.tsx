import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Providers from "./components/providers";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="login" element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</Providers>
	</StrictMode>,
);
