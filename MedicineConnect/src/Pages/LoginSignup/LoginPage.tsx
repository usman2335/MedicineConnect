import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../../index.css";

const { Title, Text } = Typography;

// 1. Define interface for form values
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const navigate = useNavigate();

  // 2. Handle form submission
  const handleFinish = async (values: LoginFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      console.log(response.data); // 👈 See what's coming from backend

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("patientName", response.data.patient.name);
        localStorage.setItem("role", response.data.role); // 👈 Save role properly

        await Swal.fire({
          title: "Login Successful!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        });

        const role = response.data.role; // 👈 Get role from here now
        console.log(role);

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "patient") {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <Title level={2} className="text-center mb-2 text-blue-600">
          Welcome Back
        </Title>
        <Text className="block text-center mb-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </Text>

        <Form
          form={form}
          layout="vertical"
          className="flex flex-col gap-4"
          onFinish={handleFinish}
        >
          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300"
              size="large"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
