import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import Logo from "../../assets/DreamSix_logo.png";
import Cookies from "js-cookie";
import { userService } from "../../Service/UserService";

const LoginPage = ({setIsAuthenticated}) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = (values) => {
    setLoading(true)
    const payload = {
      ...values,
    }
    userService.loginUser(payload)
      .then(response => {
        setLoading(true)
        Cookies.set("jwtToken", response?.data?.accessToken)
        Cookies.set("userId", response?.data?.userId)
        Cookies.set("username", response?.data?.username)
        setIsAuthenticated(response?.data?.accessToken)
        navigate("/homepage")
        message.success("Login successfully")
      })
      .catch(error => {
        message.error("Error occured while login")
        console.log('error', error)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container" style={{ padding: "10%" }}>

      <Form
        name="loginpage"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="login-form"
      >
        <div className="logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <h2>Welcome back to DreamSix !</h2>
        <Form.Item
          name="userName"
          rules={[
            { required: true, message: "Please input your mobile number!" },
          ]}
        >
          <Input placeholder="User Name" />
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
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>

        <Form.Item className="Create-Account">
          <Link to="/registration">Do you have an account ?  <span style={{color:"#ffd700"}}>  Create-Account</span> </Link>
        </Form.Item>

      </Form>
    </div>
  );
};

export default LoginPage;
