import React from "react";
import { Form, Input, Button } from "antd";
import "./Registration.scss";
import Logo from "../../assets/logo.jpeg";
import { userService } from "../../Service/UserService";

const Registration = () => {
  const onFinish = (values) => {
    const payload = {
      ...values,
      role: "USER"
    }
    userService.createUser(payload)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <h2>Hello! Register to get started</h2>
      <Form className="register-form" onFinish={onFinish} layout="vertical">
        <Form.Item
         
          name="userName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name"  style={{height:50}}/>
        </Form.Item>
        <Form.Item
          
          name="contactNumber"
          rules={[
            { required: true, message: "Please enter your WhatsApp number!" },
            { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" },
          ]}
        >
          <Input placeholder="WhatsApp Number"style={{height:50}} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
