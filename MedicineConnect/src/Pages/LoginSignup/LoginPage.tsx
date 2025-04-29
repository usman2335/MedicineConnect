import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../index.css";

const { Title, Text } = Typography;

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <Title level={2} className="text-center mb-2">
          Welcome Back
        </Title>
        <Text className="block text-center mb-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </Text>

        <Form
          layout="vertical"
          className="flex flex-col gap-4"
          onFinish={() => {
            // handle login
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
