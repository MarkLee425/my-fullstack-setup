import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Loader from "./components/loader";
import Providers from "./components/providers";

// Dynamically import page components
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LoginPage = lazy(() => import("./pages/Login"));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route index element={<Home />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="login" element={<LoginPage />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</Providers>
	</StrictMode>,
);
