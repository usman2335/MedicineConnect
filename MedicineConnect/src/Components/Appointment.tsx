import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import moment from "moment"; // to format the date
import MakeAppointment from "./MakeAppointment"; // Assuming MakeAppointment is a separate component for appointment form

const Appointment: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [form] = Form.useForm();
  const [doctorList, setDoctorList] = useState<any[]>([]); // Stores the doctor list based on department

  // Fetch appointments on initial load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  // Fetch doctors by department
  const fetchDoctorsByDepartment = (department: string) => {
    const doctors = {
      Cardiology: ["Dr. John Doe", "Dr. Alice Smith"],
      Neurology: ["Dr. Bob White", "Dr. Karen Green"],
      Pediatrics: ["Dr. Fatima Noor", "Dr. Saeed Khan"],
      Dermatology: ["Dr. Ahmed Ali", "Dr. Sarah Khan"],
      Gynecology: ["Dr. Nida Fatima", "Dr. Asma Gul"],
    };
    setDoctorList(doctors[department] || []);
  };

  // Columns for the table
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Appointment Date",
      key: "preferredDate",
      dataIndex: "preferredDate",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      ),
    },
  ];

  // Show modal for adding or editing appointment
  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  // Handle form submission (Add/Edit appointment)
  const handleSubmit = async (values: any) => {
    try {
      if (currentAppointment) {
        await axios.put(
          `http://localhost:5000/api/appointments/${currentAppointment._id}`,
          values
        );
        Swal.fire("Success", "Appointment updated successfully!", "success");
      } else {
        await axios.post("http://localhost:5000/api/appointments", values);
        Swal.fire("Success", "Appointment added successfully!", "success");
      }
      setIsModalVisible(false);
      setCurrentAppointment(null);
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error("Error handling appointment:", error);
      Swal.fire("Error", "There was an issue. Please try again.", "error");
    }
  };

  // Handle editing an appointment
  const handleEdit = (appointment: any) => {
    setCurrentAppointment(appointment);
    form.setFieldsValue({
      fullName: appointment.fullName,
      email: appointment.email,
      phoneNumber: appointment.phoneNumber,
      preferredDate: moment(appointment.preferredDate),
      department: appointment.department,
      doctor: appointment.doctor,
      message: appointment.message,
    });
    setIsModalVisible(true);
  };

  // Handle deleting an appointment
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      Swal.fire("Success", "Appointment deleted successfully!", "success");
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error("Error deleting appointment:", error);
      Swal.fire("Error", "There was an issue. Please try again.", "error");
    }
  };

  // Modal structure with MakeAppointment component
  const modalContent = (
    <MakeAppointment
      currentAppointment={currentAppointment}
      onFormSubmit={handleSubmit}
      doctorList={doctorList}
      fetchDoctorsByDepartment={fetchDoctorsByDepartment}
      form={form}
    />
  );

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <span className="text-2xl font-bold text-gray-700">Appointments</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Appointment
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={appointments}
        className="mt-3"
        rowKey="_id"
      />

      <Modal
        title={currentAppointment ? "Edit Appointment" : "Add Appointment"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Appointment;
