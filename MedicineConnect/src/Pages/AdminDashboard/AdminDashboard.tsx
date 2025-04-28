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
import { useState } from "react";
import TodayAppointmentsCard from "../../Components/TodayAppointmentsCard";
import WeeklyAppointmentsCard from "../../Components/WeeklyAppointmentsCard";
import Appointment from "../../Components/Appointment";
import Patient from "../../Components/Patient";
import Doctor from "../../Components/Doctor";

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#1f1f1f", // Dark text
  backgroundColor: "#ffffff", // White navbar background
  height: 64,
  paddingInline: 48,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle bottom shadow
};

const contentStyle: React.CSSProperties = {
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#f0f0f0",
};

const siderStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#fefefe",
};

const layoutStyle = {
  fontFamily: "Poppins",
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
};

const AdminDashboard = () => {
  const [view, setView] = useState<string>("dashboard");

  const menuItemClasses = (item: string) =>
    `flex items-center gap-3 cursor-pointer pl-5 py-2 rounded-md ${
      view === item
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "hover:bg-gray-100 text-gray-900"
    }`;

  return (
    <Layout style={layoutStyle}>
      <Sider width="15%" style={siderStyle}>
        <h1 className="text-3xl font-bold p-5 text-gray-900">Logo</h1>
        <Divider />
        <div className="flex flex-col gap-1 leading-15 mt-8 text-sm font-medium">
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

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 pl-5 py-1.5 rounded-md mt-20 text-gray-900">
            <LogoutOutlined style={{ fontSize: "2rem" }} />
            <span>Logout</span>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header style={headerStyle}>
          <div className="flex items-center justify-end gap-1">
            <Avatar icon={<UserOutlined />} />
            <span>Admin Placeholder</span>
          </div>
        </Header>

        <Content style={contentStyle}>
          {view === "dashboard" ? (
            <>
              <div className="flex gap-4 justify-between mt-5 px-10">
                <DataDisplayCard title="Total Patients" content="100" />
                <DataDisplayCard title="Total Doctors" content="100" />
                <DataDisplayCard title="Total Appointments" content="100" />
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
            <div className="text-2xl">
              <Appointment />
            </div>
          ) : view === "doctors" ? (
            <div className="text-2xl">
              <Doctor />
            </div>
          ) : view === "patients" ? (
            <div className="text-2xl">
              <Patient />
            </div>
          ) : (
            <div className="text-center text-2xl">Welcome!</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
