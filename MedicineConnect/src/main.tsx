import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>
);
