import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Staff from "./components/messStaff/StaffLogin.jsx";
import Menu from "./components/menuDashboard/Menu.jsx";
import Register from "./components/register/Register.jsx";

import "./index.css";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "dashboard",
        element: <Menu />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>,
);
