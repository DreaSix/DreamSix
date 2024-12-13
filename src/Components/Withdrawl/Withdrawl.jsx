import React, { useState } from "react";
import { Input, Select, Tabs, Button, Card, Row, Col } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Withdrawl.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const { TabPane } = Tabs;

const Withdrawl = () => {
  const [activeTab, setActiveTab] = useState("newAccount");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const navigate = useNavigate();

  const onClickProceed = () => {
    navigate("/payments-process");
  };

  return (
    <div>
        <Header/>
  
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
          <form className="form">
            <label>Amount*</label>
            <Input placeholder="Enter Amount" type="number" />
            <p className="hint">Minimum Withdrawal: ₹100</p>

            <label>Bank Name*</label>
            <Select placeholder="Type Or Select Name From The List" allowClear>
              <Select.Option value="ICICI">ICICI</Select.Option>
              <Select.Option value="SBI">SBI</Select.Option>
              <Select.Option value="HDFC">HDFC</Select.Option>
            </Select>

            <label>Account Holder's Name*</label>
            <Input placeholder="Eg. Yesipogu Sreevardhan" />

            <label>Account Number*</label>
            <Input.Password placeholder="Enter Account Number" />

            <label>IFSC Code*</label>
            <Input placeholder="Eg. ICIC0000183" />

            <div className="separator">
              <span>---------------------------- Or ------------------------------------</span>
            </div>

            <label>UPI ID</label>
            <Input placeholder="Enter UPI ID" />

            <Button type="primary" className="proceed-btn" onClick={onClickProceed}>
              Proceed
            </Button>
          </form>
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
   
        <Footer/>
        </div>
    
  );
};

export default Withdrawl;
