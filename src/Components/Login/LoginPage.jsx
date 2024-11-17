import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/main-homepage"); // Navigates to the login page
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container" style={{ padding: "10%" }}>
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="DreamSix Logo" />
      </div>
      <h2>Welcome back! Glad to see you, Again!</h2>

      <Form
        name="loginpage"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          name="mobileNumber"
          rules={[
            { required: true, message: "Please input your mobile number!" },
          ]}
        >
          <Input placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
