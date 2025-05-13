import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import type { TableProps } from "antd";

interface DataType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  consultedByDoctor: string;
}

const Patient = () => {
  const [patients, setPatients] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    consultedByDoctor: "",
  });

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch patients.");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    try {
      await axios.post("http://localhost:5000/api/patients", formData);
      message.success("Patient added successfully!");
      setIsModalOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        consultedByDoctor: "",
      });
      fetchPatients();
    } catch (error) {
      console.error(error);
      message.error("Failed to add patient.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      message.success("Patient deleted successfully!");
      fetchPatients();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete patient.");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Consulted By Doctor",
      dataIndex: "consultedByDoctor",
      key: "consultedByDoctor",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* No edit for now, you can implement similarly */}
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <span className="text-2xl font-bold text-gray-700">Patients</span>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Patient
        </Button>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={patients}
        rowKey="_id"
        className="mt-3"
      />

      <Modal
        title="Add Patient"
        open={isModalOpen}
        onOk={handleAddPatient}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-3">
          <input
            placeholder="First Name"
            className="border p-2"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            placeholder="Last Name"
            className="border p-2"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            placeholder="Email"
            className="border p-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            placeholder="Phone Number"
            className="border p-2"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <input
            placeholder="Consulted By Doctor"
            className="border p-2"
            value={formData.consultedByDoctor}
            onChange={(e) =>
              setFormData({ ...formData, consultedByDoctor: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default Patient;
