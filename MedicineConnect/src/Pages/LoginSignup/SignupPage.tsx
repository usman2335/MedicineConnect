import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import Swal
import "../../index.css";

const { Title, Text } = Typography;
interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values: SignupFormValues) => {
    const { firstName, lastName, email, password } = values;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          role: "patient",
        }
      );

      if (response.data.token) {
        await Swal.fire({
          title: "Account Created!",
          text: "Your account has been successfully created. You can now login.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/login");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Signup Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <Title level={2} className="text-center text-blue-600 mb-2">
          Create an Account
        </Title>
        <Text className="block text-center mb-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="flex flex-col gap-4"
        >
          {/* First Name */}
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "First name is required" },
              { min: 2, message: "First name must be at least 2 characters" },
              { pattern: /^[A-Za-z]+$/, message: "Only alphabets are allowed" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your first name"
            />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Last name is required" },
              { min: 2, message: "Last name must be at least 2 characters" },
              { pattern: /^[A-Za-z]+$/, message: "Only alphabets are allowed" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your last name"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Password must have 1 uppercase letter and 1 number",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
