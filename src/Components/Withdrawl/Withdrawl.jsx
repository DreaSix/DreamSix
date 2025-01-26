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
        <h2>Withdraw Funds</h2>
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
          <TabPane tab="Use New Account" key="newAccount">
            <Form form={form} onFinish={handleSubmit} className="form">
              <Form.Item
                label="Amount*"
                name="amount"
                rules={[{ required: true, message: "Please enter an amount." },
                  {
                    validator: (_, value) => {
                      const maxLimit = userWallet;
                      if (!value || value <= maxLimit) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(`Amount must not exceed ${maxLimit}.`));
                    },
                  },
                ]}
              >
                <Input
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  onWheel={handleWheel}
                  type="number"
                />
              </Form.Item>
              <p className="hint">Minimum Withdrawal: ₹100</p>

              <Form.Item
                label="Bank Name*"
                name="bankName"
              >
                <Select placeholder="Type Or Select Name From The List" allowClear>
                  <Select.Option value="ICICI">ICICI</Select.Option>
                  <Select.Option value="SBI">SBI</Select.Option>
                  <Select.Option value="HDFC">HDFC</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Account Holder's Name*"
                name="accountHolderName"
              >
                <Input placeholder="Eg. Yesipogu Sreevardhan" />
              </Form.Item>

              <Form.Item
                label="Account Number*"
                name="accountNumber"
              >
                <Input.Password placeholder="Enter Account Number" />
              </Form.Item>

              <Form.Item
                label="IFSC Code*"
                name="ifscCode"
              >
                <Input placeholder="Eg. ICIC0000183" />
              </Form.Item>

              <div className="separator">
                <span>---------------------------- Or ------------------------------------</span>
              </div>

              <Form.Item label="UPI ID" name="upiId">
                <Input
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="proceed-btn">
                  Proceed
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
              <Input placeholder="Enter Amount" type="number" />
              <p className="hint">Minimum Withdrawal: ₹100</p>

              <Button type="primary" className="proceed-btn" onClick={onClickProceed}>
                Proceed
              </Button>
            </form>
          </TabPane>
        </Tabs>
      </div>
    </main>

  );
};

export default Withdrawl;
