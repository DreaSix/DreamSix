import React, { useState } from "react";
import { Input, Button } from "antd";
import "./OtpVerification.scss";

const OtpVerification = () => {
  console.log('first')
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    alert(`Entered OTP: ${otp.join("")}`);
  };

  const onChange = (text) => {
    console.log('onChange:', text);
  };
  const onInput = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <div className="otp-container">
      <h2>OTP</h2>
      <p>We sent you an email. Please check your mail and complete OTP verification.</p>
      <div className="otp-inputs">
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      </div>
      <Button type="primary" className="confirm-btn" onClick={handleSubmit}>
        Confirm
      </Button>
    </div>
  );
};

export default OtpVerification;
