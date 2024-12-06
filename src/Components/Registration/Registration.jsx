import React from "react";
import { Form, Input, Button } from "antd";
import "./Registration.scss";
import Logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const onFinish = (values) => {
    console.log("Form Values: ", values);
  };

  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/register-process");
  };


  return (
    <div className="register-container">
      <div className="register-logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <h2>Hello! Register to get started</h2>
      <Form className="register-form" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name"  style={{height:50}}/>
        </Form.Item>
        <Form.Item
          label="What's App Number"
          name="whatsapp"
          rules={[
            { required: true, message: "Please enter your WhatsApp number!" },
            { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" },
          ]}
        >
          <Input placeholder="WhatsApp Number"style={{height:50}} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button" onClick={onLogin}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
