import { Navigate } from "react-router-dom";

import Dashboard from "pages/dashboard";
import Onboarding from "pages/onboarding";
import MainLayout from "layouts/main.layout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Navigate to="weather" /> },
      { path: "weather", element: <Onboarding /> },
      { path: "weather/dashboard", element: <Dashboard /> },
    ],
  },
];

export default routes;
