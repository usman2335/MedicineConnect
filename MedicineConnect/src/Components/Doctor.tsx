import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Form, Input } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface DataType {
  key: string;
  _id: string;
  fullName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  department: string;
  description?: string;
}

const Doctor = () => {
  const [doctors, setDoctors] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      const fetchedDoctors = response.data.data || response.data;
      setDoctors(
        fetchedDoctors.map((doctor: any) => ({
          key: doctor._id,
          ...doctor,
        }))
      );
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataType) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (values._id) {
        // Edit doctor
        await axios.put(
          `http://localhost:5000/api/doctors/${values._id}`,
          values
        );
      } else {
        // Add new doctor
        await axios.post("http://localhost:5000/api/doctors", values);
      }
      fetchDoctors();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
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

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <span className="text-2xl font-bold text-gray-700">Doctors</span>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddDoctor}
        >
          Add Doctor
        </Button>
      </div>

      <Table<DataType> columns={columns} dataSource={doctors} />

      <Modal
        title="Doctor"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Hidden ID for Editing */}
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true, message: "Please enter specialization" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please enter department" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Doctor;
