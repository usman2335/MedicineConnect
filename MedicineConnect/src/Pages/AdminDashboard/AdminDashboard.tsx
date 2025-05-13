import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar, Divider, Layout } from "antd";
import {
  CalendarOutlined,
  DashboardOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "../../index.css";
import "./AdminDashboard.css";
import DataDisplayCard from "../../Components/DataDisplayCard";
import TodayAppointmentsCard from "../../Components/TodayAppointmentsCard";
import WeeklyAppointmentsCard from "../../Components/WeeklyAppointmentsCard";
import Appointment from "../../Components/Appointment";
import Doctor from "../../Components/Doctor";
import Patient from "../../Components/Patient";

const { Sider, Content } = Layout;

const layoutStyle = {
  fontFamily: "Poppins",
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
};

const AdminDashboard = () => {
  const [view, setView] = useState<string>("dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName") || "Admin";

  const menuItemClasses = (item: string) =>
    `flex items-center gap-3 cursor-pointer pl-5 py-2 rounded-md ${
      view === item
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "hover:bg-gray-100 text-gray-900"
    }`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminName");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <Layout style={layoutStyle}>
      <Sider width="15%" style={{ backgroundColor: "#fefefe" }}>
        <Divider />
        <div className="flex flex-col items-center mt-8">
          <Avatar size={64} icon={<UserOutlined />} />
          <h3 className="mt-2 text-md font-semibold text-gray-700">
            {adminName}
          </h3>
        </div>
        <Divider />
        <div className="flex flex-col gap-1 leading-15 text-sm font-medium">
          <div
            className={menuItemClasses("dashboard")}
            onClick={() => setView("dashboard")}
          >
            <DashboardOutlined style={{ fontSize: "1.5rem" }} />
            <span>Dashboard</span>
          </div>
          <div
            className={menuItemClasses("appointments")}
            onClick={() => setView("appointments")}
          >
            <CalendarOutlined style={{ fontSize: "1.5rem" }} />
            <span>Appointments</span>
          </div>
          <div
            className={menuItemClasses("doctors")}
            onClick={() => setView("doctors")}
          >
            <MedicineBoxOutlined style={{ fontSize: "1.5rem" }} />
            <span>Doctors</span>
          </div>
          <div
            className={menuItemClasses("patients")}
            onClick={() => setView("patients")}
          >
            <UserOutlined style={{ fontSize: "1.5rem" }} />
            <span>Patients</span>
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 pl-5 py-2 rounded-md mt-20 text-gray-900"
            onClick={handleLogout}
          >
            <LogoutOutlined style={{ fontSize: "2rem" }} />
            <span>Logout</span>
          </div>
        </div>
      </Sider>

      <Layout>
        <Content style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
          {view === "dashboard" ? (
            <>
              <div className="flex gap-4 justify-between mt-5 px-10">
                <DataDisplayCard
                  title="Total Patients"
                  content={dashboardData?.totalPatients ?? "Loading..."}
                />
                <DataDisplayCard
                  title="Total Doctors"
                  content={dashboardData?.totalDoctors ?? "Loading..."}
                />
                <DataDisplayCard
                  title="Total Appointments"
                  content={dashboardData?.totalAppointments ?? "Loading..."}
                />
              </div>
              <div className="flex justify-between mt-5 px-10">
                <TodayAppointmentsCard
                  title="Today's Appointments"
                  content="No Appointments Found"
                />
                <WeeklyAppointmentsCard
                  title="Weekly Appointments"
                  content="No Appointments Found"
                />
              </div>
            </>
          ) : view === "appointments" ? (
            <Appointment />
          ) : view === "doctors" ? (
            <Doctor />
          ) : view === "patients" ? (
            <Patient />
          ) : (
            <div className="text-center text-2xl">Welcome!</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
