import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  patientId: string;
  name: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  registeredOn: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "patientId",
    key: "patientId",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "Registered On",
    key: "registeredOn",
    dataIndex: "registeredOn",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text) => (
      <Tag color={text === "Active" ? "green" : "red"}>{text}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    patientId: "1",
    name: "Usman Afzal",
    specialization: "Cardiologist",
    email: "usmanafzal@gmail.com",
    phoneNumber: "1234567890",
    registeredOn: "2021-01-01",
    status: "Active",
  },
  {
    key: "2",
    patientId: "2",
    name: "John Brown",
    specialization: "Oncologist",
    email: "usmanafzal@gmail.com",
    phoneNumber: "1234567890",
    registeredOn: "2021-01-01",
    status: "Active",
  },
  {
    key: "3",
    patientId: "3",
    name: "John Brown",
    specialization: "Pediatrician",
    email: "usmanafzal@gmail.com",
    phoneNumber: "1234567890",
    registeredOn: "2021-01-01",
    status: "Active",
  },
];

const Doctor = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <span className="text-2xl font-bold text-gray-700">Doctors</span>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Doctor
        </Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
};

export default Doctor;
