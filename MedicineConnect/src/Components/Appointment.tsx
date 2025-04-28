import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  patientName: string;
  services: string;
  charges: number;
  paymentMode: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Services",
    dataIndex: "services",
    key: "services",
  },
  {
    title: "Charges",
    dataIndex: "charges",
    key: "charges",
  },
  {
    title: "Payment Mode",
    key: "paymentMode",
    dataIndex: "paymentMode",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text) => (
      <Tag color={text === "Ongoing" ? "blue" : "green"}>{text}</Tag>
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
    patientName: "John Brown",
    services: "Consultation",
    charges: 1000,
    paymentMode: "Cash",
    status: "Ongoing",
  },
  {
    key: "2",
    patientName: "John Brown",
    services: "Consultation",
    charges: 1000,
    paymentMode: "Cash",
    status: "Ongoing",
  },
  {
    key: "3",
    patientName: "John Brown",
    services: "Consultation",
    charges: 1000,
    paymentMode: "Cash",
    status: "Ongoing",
  },
  {
    key: "4",
    patientName: "John Brown",
    services: "Consultation",
    charges: 1000,
    paymentMode: "Cash",
    status: "Ongoing",
  },
];

const Appointment = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <span className="text-2xl font-bold text-gray-700">Appointments</span>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Appointment
        </Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
};

export default Appointment;
