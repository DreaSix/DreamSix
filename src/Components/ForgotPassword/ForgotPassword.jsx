import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { otpWidget } from "../../Service/OtpVerificationService";
import { userService } from "../../Service/UserService";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Enter Mobile, Step 2: Enter OTP, Step 3: Reset Password
  const [form] = Form.useForm();
  const [otpNumber, setOtpNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [requestId, setRequestId] = useState(null);

  const handleSendOtp = () => {
    const phoneNumber = form.getFieldValue("phoneNumber");
    if (!phoneNumber) {
      return message.error("Please enter your mobile number");
    }

    otpWidget
      .sendOtp({ mobileNumber: phoneNumber })
      .then((response) => {
        setRequestId(response?.message);
        setIsOtpSent(true);
        setCountdown(60);
        setStep(2);
      })
      .catch((error) => {
        console.log("Error sending OTP", error);
        message.error("Error sending OTP. Try again.");
      });
  };


  const handleVerifyOtp = () => {
    const phoneNumber = form.getFieldValue("phoneNumber");
    if (!phoneNumber || !otpNumber) {
      return message.error("Please enter your mobile number and OTP");
    }

    otpWidget
      .verifyOtp({
        mobileNumber: phoneNumber,
        otp: otpNumber,
        reqId: requestId,
      })
      .then((response) => {
        if (response?.type === "success") {
          message.success("OTP verified successfully!");
          setStep(3); // Move to password reset step
          
        } else {
          message.error("Invalid OTP, please try again.");
        }
      })
      .catch((error) => {
        console.log("Error verifying OTP", error);
        message.error("OTP verification failed.");
      });
  };

  const handleResetPassword = (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Passwords do not match!");
    }

    const params = {
      userName: form.getFieldValue("phoneNumber"),
      newPassword: values.password,
    };

    userService
      .forgotPassword(params)
      .then(() => {

        message.success("Password reset successful! Please login.");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error resetting password", error);
        message.error("Error resetting password. Try again.");
      });
  };

  return (
    <div className="forgot-password-container">
      <Form className="forgot-password-form" layout="vertical" form={form} onFinish={handleResetPassword}>
        <h2 style={{marginBottom:"40px"}}>Forgot Password</h2>

        {/* Step 1: Enter Mobile Number */}
        {step === 1 && (
          <>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Enter your mobile number!" },
                { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number!" },
              ]}
            >
              <Input placeholder="Enter Mobile Number" />
            </Form.Item>

            <Button type="primary" onClick={handleSendOtp}>
              Send OTP
            </Button>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <Form.Item>
              <Input
                placeholder="Enter OTP"
                maxLength={6}
                onChange={(e) => setOtpNumber(e.target.value)}
              />
            </Form.Item>

            <Button type="primary" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter your new password!" }]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "Re-enter your new password!" }]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ForgotPassword;
