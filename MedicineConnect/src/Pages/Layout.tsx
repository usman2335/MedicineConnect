// src/Components/Layout.tsx or src/Pages/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
