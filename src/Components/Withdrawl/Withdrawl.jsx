import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Tabs,
  Button,
  Card,
  Row,
  Col,
  Form,
  message,
} from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Withdrawl.scss";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { userService } from "../../Service/UserService";

const { TabPane } = Tabs;

const Withdrawl = () => {
  const [form] = Form.useForm();

  const [userWallet, setUserWallet] = useState(0);
  const [activeTab, setActiveTab] = useState("newAccount");
  const [amount, setAmount] = useState();
  const [allWithdraws, setAllWithdraws] = useState();
  const [upiId, setUpiId] = useState();
  const [selectedAccount, setSelectedAccount] = useState();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    getAllWithdraws();
  }, []);

  const getAllWithdraws = () => {
    matchDetailsService
      .getAllWIthdrawAccounts()
      .then((response) => {
        setAllWithdraws(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    userService
      .getUser(Cookies.get("userId"))
      .then((response) => {
        setUserWallet(response?.data?.balance);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      paymentOption: "Withdraw",
      userId: Cookies.get("userId"),
    };

    matchDetailsService
      .addWithdraw(payload)
      .then((response) => {
        message.success("Withdraw Added Successfully");
        navigate("/payments-process");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const navigate = useNavigate();

  const onClickProceed = () => {
    form
      .validateFields()
      .then(() => {
        const { amount } = form.getFieldsValue();

        if (!amount) {
          message.error("Please enter a valid amount!");
          return;
        }

        const payload = {
          amount: amount,
          withdrawBankId: selectedAccount?.id,
        };

        matchDetailsService
          .createWithdrawRequest(payload)
          .then((response) => {
            message.success("Withdraw Added Successfully");
            navigate("/payments-process");
          })
          .catch((error) => {
            console.log("error", error);
            message.error("Failed to process withdrawal.");
          });
      })
      .catch((error) => console.log("Validation Error:", error));
  };

  const handleWheel = (e) => {
    e.target.blur();
    setTimeout(() => {
      e.target.focus();
    }, 0);
    e.preventDefault();
  };

  const handleDeleteAccount = (id) => {
    matchDetailsService
      .deleteWithdrawAccount(id)
      .then((response) => {
        console.log("response", response);
        getAllWithdraws();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSelectAccount = (withdraw) => {
    setSelectedAccount(withdraw);
  };

  return (
    <main>
      <div className="withdraw-funds">
        <ul className="instructions">
          <li>1. "Your Deposit Is Being Processed."</li>
          <li>2 "Estimated Time: 2-5 Minutes."</li>
          <li>
            3. "You Will Receive A Confirmation Once The Deposit Is Complete."
          </li>
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
                rules={[
                  { required: true, message: "Please enter your bank name!" },
                ]}
              >
                <Input
                  style={{ border: "0.3px solid black" }}
                  placeholder="Enter bank name"
                />
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
                <Input
                  style={{ border: "0.3px solid black" }}
                  placeholder="Enter account holder name"
                />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[
                  { required: true, message: "Please enter account number!" },
                ]}
              >
                <Input
                  style={{ border: "0.3px solid black" }}
                  placeholder="Enter account number"
                />
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
                <Input
                  style={{ border: "0.3px solid black" }}
                  placeholder="Enter IFSC code"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ backgroundColor: "#ffc107" }}
                  htmlType="submit"
                  className="w-full"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Use Previous Account" key="previousAccount">
            {allWithdraws &&
              allWithdraws?.map((withdraw) => (
                <Card
                  onClick={() => handleSelectAccount(withdraw)}
                  className={`previous-account-card ${
                    selectedAccount && "selected"
                  }`}
                >
                  <Row>
                    <Col span={22}>
                      <h4 className="account-title">
                        <CheckCircleOutlined
                          style={{ color: "green", marginRight: "8px" }}
                        />
                        Primary Account
                      </h4>
                      <p>
                        <b>Account Name : </b> {withdraw?.bankName}
                      </p>
                      <p>
                        <b>Holder Name : </b> {withdraw?.accountHolderName}
                      </p>
                      <p>
                        <b>Account : </b> {withdraw?.accountNumber}
                      </p>
                      <p>
                        <b>IFSC : </b> {withdraw?.ifscCode}
                      </p>
                    </Col>
                    <Col span={2}>
                      <DeleteOutlined
                        onClick={() => handleDeleteAccount(withdraw?.id)}
                        className="delete-icon"
                      />
                    </Col>
                  </Row>
                </Card>
              ))}

            <form className="form">
              <Form.Item
                name="amount"
                label="Amount"
                validateTrigger="onBlur"
                rules={[
                  { required: true, message: "Please enter an amount!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(
                          new Error("Please enter an amount!")
                        );
                      }
                      if (value <= 0) {
                        return Promise.reject(
                          new Error("Amount must be greater than ₹0")
                        );
                      }
                      if (value > userWallet) {
                        return Promise.reject(
                          new Error(
                            `Amount cannot exceed your balance of ₹${userWallet}`
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  style={{ border: "0.3px solid black" }}
                  placeholder={`Enter amount (Max: ₹${userWallet})`}
                  type="number"
                  onWheel={(e) => e.target.blur()} // Prevent scroll input change
                />
              </Form.Item>

              <p className="hint">Minimum Withdrawal: ₹100</p>

              <Button
                type="primary"
                className="proceed-btn"
                onClick={onClickProceed}
              >
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
