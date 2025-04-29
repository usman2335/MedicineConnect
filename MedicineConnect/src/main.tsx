import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import SignupPage from "./Pages/LoginSignup/SignupPage";
import LoginPage from "./Pages/LoginSignup/LoginPage";
import LandingPage from "./Pages/LandingPage";
import Layout from "./Pages/Layout";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
