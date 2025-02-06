import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Registration.scss";
import Logo from "../../assets/logo.jpeg";
import { userService } from "../../Service/UserService";
import { roleService } from "../../Service/RoleService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate()
  const [roleList, setRoleList] = useState([])

  useEffect(() => {
    getRoleList()
  }, [])

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
    if (values.password !== values.confirmPassword){
      return message.error("Password and confirm password should be equal")
    }
    const role = roleList?.filter(role => role.roleName === "USER")
    const payload = {
      ...values,
      roles: role?.id
    }
    userService.createUser(payload)
      .then(response => {
        navigate("/loginpage")
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
         
          name="name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name"  style={{height:50}}/>
        </Form.Item>
        <Form.Item
          
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your WhatsApp number!" },
            { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" },
          ]}
        >
          <Input placeholder="WhatsApp Number"style={{height:50}} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input type="password" />
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
