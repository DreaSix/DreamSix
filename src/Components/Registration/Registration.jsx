import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Registration.scss";
import Logo from "../../assets/logo.jpeg";
import { userService } from "../../Service/UserService";
import { roleService } from "../../Service/RoleService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { otpWidget } from "../../Service/OtpVerificationService";

const Registration = () => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);
  const [otpNumber, setOtpNumber] = useState(null);
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0); 
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    getRoleList();
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); 
  }, [countdown]);

  const getRoleList = () => {
    axios
      .get("http://localhost:8080/api/role/all")
      .then((response) => {
        setRoleList(response?.data?.totalContent);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Password and confirm password should be equal");
    }

    const role = roleList?.find((role) => role.roleName === "USER");
    const payload = {
      ...values,
      roles: [role?.id],
    };

    userService
      .createUser(payload)
      .then((response) => {
        message.success("Registration successful !");
        navigate("/"); 
      })
      .catch((error) => {
        console.log("error", error);
        message.error(error?.data?.message)
      });
  };

  const onChange = (text) => {
    setOtpNumber(text);
  };

  const onInput = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  const handleSendOtp = () => {
    const phoneNumber = form.getFieldValue("phoneNumber");

    if (!phoneNumber) {
      return message.error("Please enter a valid phone number");
    }

    const params = {
      mobileNumber: phoneNumber,
    };

    otpWidget
      .sendOtp(params)
      .then((response) => {
        console.log("OTP sent successfully", response);
        setRequestId(response?.message); 
        setIsOtpSent(true); 
        setCountdown(60); 
      })
      .catch((error) => {
        console.log("Error sending OTP", error);
      });
  };

  const handleVerifyOtp = () => {
    const phoneNumber = form.getFieldValue("phoneNumber");

    if (!phoneNumber) {
      return message.error("Please enter a valid phone number");
    }

    const params = {
      mobileNumber: phoneNumber,
      otp: otpNumber,
      reqId: requestId,
    };

    otpWidget
      .verifyOtp(params)
      .then((response) => {
        if(response?.type === "success"){
          onFinish(form.getFieldsValue()); 
        }else if (response?.message=== "invalid otp"){
          message.error("OTP verification failed , please try again");
        }
        
      })
      .catch((error) => {
        console.log("Error verifying OTP", error);
        message.error("Error occurred while verifying OTP. Please try again.");
      });
  };

  return (
    <div className="register-container">
      <Form
        className="register-form"
        layout="vertical"
        form={form}
        onFinish={handleVerifyOtp} 
      >
        <div className="register-logo">
          <img src={Logo} alt="DreamSix Logo" />
        </div>
        <h2>Welcome to DreamSix!</h2>
        <Form.Item name="name" rules={[{ required: true, message: "Please enter your full name!" }]}>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Enter WhatsApp number!" },
            { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" },
          ]}
        >
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Button onClick={handleSendOtp} disabled={isOtpSent && countdown > 0}>
          {isOtpSent && countdown > 0 ? `Resend OTP in ${countdown}s` : "Get OTP"}
        </Button>
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />

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
          <p>
            Already Have An Account? <a href="/login">Login</a>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
