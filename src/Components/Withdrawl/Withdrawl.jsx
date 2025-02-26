import React, { useEffect, useState } from "react";
import { Input, Select, Tabs, Button, Card, Row, Col, Form, message } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Withdrawl.scss";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { userService } from "../../Service/UserService";

const { TabPane } = Tabs;

const Withdrawl = () => {
  const [form] = Form.useForm();


  const [userWallet, setUserWallet] = useState(0)
  const [activeTab, setActiveTab] = useState("newAccount");
  const [amount, setAmount] = useState()
  const [upiId, setUpiId] = useState()

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = () => {
    userService.getUser(Cookies.get("userId"))
      .then(response => {
        setUserWallet(response?.data?.userWallet)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      paymentOption: "Withdraw",
      userId: Cookies.get("userId")
    }

    matchDetailsService.addWithdraw(payload)
      .then(response => {
        message.success("Withdraw Added Successfully")
        navigate("/payments-process")
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const navigate = useNavigate();

  const onClickProceed = () => {
    navigate("/payments-process");
  };

  const handleWheel = (e) => {
    e.target.blur();
    setTimeout(() => {
      e.target.focus();
    }, 0);
    e.preventDefault();
  };

  return (
    <main>

      <div className="withdraw-funds">
        <ul className="instructions">
          <li>1. "Your Deposit Is Being Processed."</li>
          <li>2 "Estimated Time: 2-5 Minutes."</li>
          <li>3. "You Will Receive A Confirmation Once The Deposit Is Complete."</li>
        </ul>

        <h3>Please fill in all required fields</h3>

        <Tabs
          defaultActiveKey="newAccount"
          onChange={handleTabChange}
          centered
          className="account-tabs"
        >
          <TabPane tab="Create Bank account" key="newAccount">
            <Form
              form={form}
              name="withdrawBankForm"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[{ required: true, message: "Please enter your bank name!" }]}
              >
                <Input  style={{border:"0.3px solid black"}} placeholder="Enter bank name" />
              </Form.Item>

              <Form.Item
                name="accountHolderName"
                label="Account Holder Name"
                rules={[{ required: true, message: "Please enter account holder name!" }]}
              >
                <Input  style={{border:"0.3px solid black"}}  placeholder="Enter account holder name" />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[{ required: true, message: "Please enter account number!" }]}
              >
                <Input  style={{border:"0.3px solid black"}} placeholder="Enter account number" />
              </Form.Item>

              <Form.Item
                name="ifscCode"
                label="IFSC Code"
                rules={[
              {required: true, message: "Please enter IFSC code!" },
              {pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter a valid IFSC code!" }
              ]}
      >
              <Input  style={{border:"0.3px solid black"}} placeholder="Enter IFSC code" />
            </Form.Item>

            <Form.Item>
              <Button style={{backgroundColor:"#ffc107"}} htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Use Previous Account" key="previousAccount">
          <Card className="previous-account-card">
            <Row>
              <Col span={22}>
                <h4 className="account-title">
                  <CheckCircleOutlined style={{ color: "green", marginRight: "8px" }} />
                  Primary Account
                </h4>
                <p><b>Account Name  :   </b> ICICI</p>
                <p><b>Holder Name  :   </b> Yesipogu Sreevardhan</p>
                <p><b>Account  :   </b> 006901596780</p>
                <p><b>IFSC  :   </b> ICIC0000183</p>
              </Col>
              <Col span={2}>
                <DeleteOutlined className="delete-icon" />
              </Col>
            </Row>
          </Card>

          <form className="form">
            <label>Amount*</label>
            <Input  style={{border:"0.3px solid black"}} placeholder="Enter Amount" type="number" />
            <p className="hint">Minimum Withdrawal: ₹100</p>

            <Button type="primary" className="proceed-btn" onClick={onClickProceed}>
              Proceed
            </Button>
          </form>
        </TabPane>
      </Tabs>
    </div>
    </main >

  );
};

export default Withdrawl;
