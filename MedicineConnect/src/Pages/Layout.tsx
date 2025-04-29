// src/Components/Layout.tsx or src/Pages/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";
import LandingPage from "./LandingPage";
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage />
      </main>
    </>
  );
};

export default Layout;
