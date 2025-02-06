import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import Logo from "../../assets/logo.jpeg";
import Cookies from "js-cookie";
import { userService } from "../../Service/UserService";

const LoginPage = ({setIsAuthenticated}) => {
  const navigate = useNavigate()

  const onFinish = (values) => {
    const payload = {
      ...values,
    }
    userService.loginUser(payload)
      .then(response => {
        console.log('response', response)
        Cookies.set("jwtToken", response?.data?.accessToken)
        Cookies.set("userId", response?.data?.userId)
        setIsAuthenticated(response?.data?.accessToken)
        navigate("/homepage")
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container" style={{ padding: "10%" }}>
      <div className="logo">
        <img src={Logo} alt="DreamSix Logo" />
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
          >
            Login
          </Button>
        </Form.Item>

        <Form.Item className="Create-Account">
          <Link to="/">Do you have an account ?  <span style={{color:"black"}}>  Create-Account</span> </Link>
        </Form.Item>

      </Form>
    </div>
  );
};

export default LoginPage;
