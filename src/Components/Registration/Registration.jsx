import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Registration.scss";
import Logo from "../../assets/logo.jpeg";
import { userService } from "../../Service/UserService";
import { roleService } from "../../Service/RoleService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);

  const handleOTP = () => {
    navigate("/otpverification");
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = () => {
    axios.get("http://localhost:8080/api/role/all")
    .then(response => {
      console.log('response', response)
      setRoleList(response?.data?.totalContent)
    })
    .catch(error => {
      console.error("Error:", error);
    })
  };

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Password and confirm password should be equal");
    }
    const role = roleList?.find(role => role.roleName === "USER")
    console.log('role', role)
    const payload = {
      ...values,
      roles: [role?.id]
    }
    userService.createUser(payload)
      .then(response => {
        navigate("/")
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="register-container">
      <Form className="register-form" onFinish={onFinish} layout="vertical">
      <div className="register-logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <h2>Welcome to DreamSix !</h2>
        <Form.Item name="name" rules={[{ required: true, message: "Please enter your full name!" }]}> 
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="phoneNumber" rules={[{ required: true, message: "Enter WhatsApp number!" }, { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" }]}> 
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Enter your password!" }]}> 
          <Input.Password placeholder="Create Password" type="password" />
        </Form.Item>
        <Form.Item name="confirmPassword" rules={[{ required: true, message: "Re-enter your password!" }]}> 
          <Input.Password placeholder="Re-Enter Password" type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
        </Form.Item>
        <div className="login-link">
          <p>Already Have An Account? <a href="/login">Login</a></p>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
