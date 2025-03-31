import React, { useEffect, useState } from "react";
import { Input, Tabs, Button, Card, Row, Col, Form, message } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Withdrawl.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { userService } from "../../Service/UserService";

const { TabPane } = Tabs;

const Withdrawl = () => {
  const [newAccountForm] = Form.useForm(); // Form instance for 'Create Bank Account'
  const [withdrawForm] = Form.useForm(); // Form instance for 'Use Previous Account'

  const [userWallet, setUserWallet] = useState(0);
  const [activeTab, setActiveTab] = useState("newAccount");
  const [allWithdraws, setAllWithdraws] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllWithdraws();
    getUserDetails();
  }, []);

  const getAllWithdraws = () => {
    matchDetailsService
      .getAllWIthdrawAccounts()
      .then((response) => {
        setAllWithdraws(response?.data);
      })
      .catch((error) =>
        console.error("Error fetching withdraw accounts", error)
      );
  };

  const getUserDetails = () => {
    userService
      .getUser(Cookies.get("userId"))
      .then((response) => {
        setUserWallet(response?.data?.balance);
      })
      .catch((error) => console.error("Error fetching user details", error));
  };

  // Form submission for "Create Bank Account"
  const handleNewAccountSubmit = (values) => {
    const payload = {
      ...values,
      paymentOption: "Withdraw",
      userId: Cookies.get("userId"),
    };

    matchDetailsService
      .addWithdraw(payload)
      .then(() => {
        message.success("Bank account added successfully!");
        newAccountForm.resetFields();
        getAllWithdraws();
      })
      .catch((error) => {
        console.error("Error adding withdraw account", error);
        message.error("Failed to add withdraw account.");
      });
  };

  const handleWithdrawSubmit = (values) => {

    const payload = {
      withdrawBankId: selectedAccount?.id,
      ...values,
    };
    
    matchDetailsService
      .createWithdrawRequest(payload)
      .then(() => {
        message.success("Withdraw request submitted successfully!");
        navigate("/transactions");
      })
      .catch((error) => {
        console.error("Error processing withdrawal", error);
        message.error("Failed to process withdrawal.");
      });
  };

  const handleDeleteAccount = (id) => {
    matchDetailsService
      .deleteWithdrawAccount(id)
      .then(() => {
        message.success("Withdraw account deleted successfully.");
        getAllWithdraws();
      })
      .catch((error) => {
        console.error("Error deleting withdraw account", error);
        message.error("Failed to delete withdraw account.");
      });
  };

  return (
    <main>
      <div className="withdraw-funds">
        <Tabs
          defaultActiveKey="newAccount"
          onChange={setActiveTab}
          centered
          className="account-tabs"
        >
          {/* New Bank Account Form */}
          <TabPane tab="Create Bank Account" key="newAccount">
            <Form
              form={newAccountForm}
              name="newAccountForm"
              onFinish={handleNewAccountSubmit}
              layout="vertical"
            >
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[
                  { required: true, message: "Please enter your bank name!" },
                ]}
              >
                <Input placeholder="Enter bank name" />
              </Form.Item>

              <Form.Item
                name="accountHolderName"
                label="Account Holder Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter account holder name!",
                  },
                ]}
              >
                <Input placeholder="Enter account holder name" />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[
                  { required: true, message: "Please enter account number!" },
                ]}
              >
                <Input placeholder="Enter account number" />
              </Form.Item>

              <Form.Item
                name="ifscCode"
                label="IFSC Code"
                rules={[
                  { required: true, message: "Please enter IFSC code!" },
                  {
                    pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: "Enter a valid IFSC code!",
                  },
                ]}
              >
                <Input placeholder="Enter IFSC code" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* Use Previous Account Form */}
          <TabPane tab="Use Previous Account" key="previousAccount">
            {allWithdraws.length > 0 ? (
              allWithdraws.map((withdraw) => (
                <Card
                  key={withdraw.id}
                  onClick={() => setSelectedAccount(withdraw)}
                  className={`previous-account-card ${
                    selectedAccount?.id === withdraw.id ? "selected" : ""
                  }`}
                >
                  <Row>
                    <Col span={22}>
                      <h4 className="account-title">
                        <CheckCircleOutlined
                          style={{ color: "green", marginRight: "8px" }}
                        />
                        {withdraw.bankName}
                      </h4>
                      <p>
                        <b>Holder Name:</b> {withdraw.accountHolderName}
                      </p>
                      <p>
                        <b>Account:</b> {withdraw.accountNumber}
                      </p>
                      <p>
                        <b>IFSC:</b> {withdraw.ifscCode}
                      </p>
                    </Col>
                    <Col span={2}>
                      <DeleteOutlined
                        onClick={() => handleDeleteAccount(withdraw.id)}
                        className="delete-icon"
                      />
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <p>No saved accounts found.</p>
            )}

            <Form
              form={withdrawForm}
              onFinish={handleWithdrawSubmit}
              name="withdrawForm"
              layout="vertical"
            >
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) return Promise.reject("Please enter an amount!");
                      if (value < 100) return Promise.reject("Minimum amount should be ₹100");
                      if (value > userWallet)
                        return Promise.reject(
                          `Amount cannot exceed your balance of ₹${userWallet}`
                        );
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  placeholder={`Enter amount (Max: ₹${userWallet})`}
                  type="number"
                />
              </Form.Item>

              <p className="hint">Minimum Withdrawal: ₹100</p>

              <Button htmlType="submit" >
                Proceed
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </main>
  );
};

export default Withdrawl;
