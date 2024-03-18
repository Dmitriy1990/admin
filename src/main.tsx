import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { routes } from "./constantes/routes";
import { Login } from "./pages/Auth/Login";
import { Contracts } from "./pages/contracts/Contracts";
import { HubProvider } from "./context/hubContext";

const router = createBrowserRouter([
  {
    element: <HubProvider />,
    children: [
      {
        path: routes.main,
        element: <Contracts />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: "*",
        element: <Navigate to={routes.main} replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="main-wrapper">
    <RouterProvider router={router} />
  </div>
);
