import React, { useState } from "react";
import { Button, Input, Upload, Radio, message } from "antd";
import { CopyOutlined, UploadOutlined } from "@ant-design/icons";
import './DepositPage.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paytm");
  const [fileList, setFileList] = useState()

  const navigate = useNavigate();

  const OnchangePayment = () =>{   
      const formData = new FormData();
      formData.append("amount", amount)
      formData.append("paymentMethod", paymentMethod)
      formData.append("utrNumber", utrNumber)
      formData.append("paymentOption", "Deposit")
      formData.append("userId", Cookies.get("userId"))
      if (fileList.length > 0) {
        fileList.forEach((file) => {
          formData.append("uploadedProof", file.originFileObj);
        });
      }

      matchDetailsService.addDeposite(formData)
        .then(response => {
          console.log('response', response)
        })
        .catch(error => {
          console.log('error', error)
        })

  }

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleUtrChange = (e) => {
    setUtrNumber(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  const handleFileUpload = ({fileList}) => {
    setFileList(fileList)
  }

  return (
    <div>
      <Header/>
    <div className="deposit-page">

      <div className="deposit-form">
        <h3>Amount*</h3>
        <Input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <p className="min-deposit">Minimum Deposit: 100</p>

        <div className="amount-buttons">
          <Button onClick={() => handleAmountChange("100")}>+100</Button>
          <Button onClick={() => handleAmountChange("500")}>+500</Button>
          <Button onClick={() => handleAmountChange("1000")}>+1000</Button>
          <Button onClick={() => handleAmountChange("5000")}>+5000</Button>
        </div>

        <h3>Payment Methods</h3>
        <Radio.Group
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="payment-methods"
        >
          <Radio.Button value="Paytm">Paytm</Radio.Button>
          <Radio.Button value="PhonePe">PhonePe</Radio.Button>
          <Radio.Button value="GooglePay">G-Pay</Radio.Button>
        </Radio.Group>

        <div className="payment-details">
          <p>1. "Your Deposit Is Being Processed."</p>
          <p>2. "Estimated Time: 2-5 Minutes."</p>
          <p>3. "You Will Receive A Confirmation Once The Deposit Is Complete."</p>
        </div>

        <h3>Payment Details</h3>
        <div className="payment-info">
          <p>Account Name: <span>Paytm</span></p>
          <p>
            Holder Name: <span>Kabali</span>
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard("Kabali")}
            />
          </p>
          <p>
            UPI ID: <span>kabali@paytm</span>
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard("kabali@paytm")}
            />
          </p>
          <p>
            UPI Phone No: <span>9515206990</span>
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard("9515206990")}
            />
          </p>
        </div>

        <h3>Upload your photo below</h3>

        <Upload
            listType="picture"
            maxCount={1}
            accept="image/*"
            onChange={handleFileUpload}
        >
          <Button icon={<UploadOutlined />}>Upload or drop a file right here</Button>
        </Upload>

        <h3>Enter UTR Number</h3>
        <Input
          placeholder="10 or 12 Digit UTR Number"
          value={utrNumber}
          onChange={handleUtrChange}
        />
        <p className="utr-warning">
          Kindly Enter UTR Number Manually For Fast Deposit
        </p>

        <Button onClick={OnchangePayment} type="primary" className="proceed-button" >
          Proceed
        </Button>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  );
};

export default DepositPage;
