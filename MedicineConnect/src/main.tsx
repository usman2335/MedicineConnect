import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Layout from "./Pages/Layout"; // or Components/Layout depending on where you saved it

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
