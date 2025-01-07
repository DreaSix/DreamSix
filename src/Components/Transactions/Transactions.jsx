import React, { useState } from 'react';
import { Button, Tabs, List } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, RightOutlined } from '@ant-design/icons';
import './Transactions.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const transactions = [
  {
    id: 'tnx33074901',
    date: 'Aug 6th, 2024, 16:08:05',
    amount: '₹1000',
    status: 'pending',
  },
  {
    id: 'tnx32492668',
    date: 'Aug 32th, 2024, 23:17:40',
    amount: '₹1000',
    status: 'success',
  },
];

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState('deposit');

  const navigate = useNavigate();

  const OnpaymentStatus  = () => {
    navigate("/payment-status");
  };

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <main>
    <div>
    <div className="transaction-page-container">
      <Tabs defaultActiveKey="deposit" onChange={onTabChange}>
        <TabPane
          tab={<Button className={activeTab === 'deposit' ? 'active-tab' : ''}>Deposit</Button>}
          key="deposit"
        />
        <TabPane
          tab={<Button className={activeTab === 'withdrawal' ? 'active-tab' : ''}>Withdrawal</Button>}
          key="withdrawal"
        />
      </Tabs>

      <List
        className="transaction-list"
        itemLayout="horizontal"
        dataSource={transactions}
        renderItem={(transaction) => (
          <List.Item
            actions={[
              <RightOutlined onClick={OnpaymentStatus} key="arrow" style={{ color: '#fff' }} />,
            ]}
          >
            <List.Item.Meta
              avatar={
                transaction.status === 'success' ? (
                  <CheckCircleOutlined style={{ color: '#4caf50', fontSize: '24px' }} />
                ) : (
                  <QuestionCircleOutlined style={{ color: '#ff5252', fontSize: '24px' }} />
                )
              }
              title={`#${transaction.id}`}
              description={transaction.date}
            />
            <div className="transaction-amount">{transaction.amount}</div>
          </List.Item>
        )}
      />
    </div>
    </div>
    </main>
  );
};

export default TransactionPage;
