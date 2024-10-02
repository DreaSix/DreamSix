import React, { useState } from "react";
import { Button, Drawer, Avatar, List } from "antd";
import { UserOutlined, BankOutlined, LockOutlined, HistoryOutlined, PhoneOutlined, PoweroffOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setVisible(false); // Close drawer on navigation
  };

  return (
    <div className="side-menu">
      {/* Menu Button */}
      <Button type="text" onClick={showDrawer} className="menu-icon-button">
        <MenuOutlined className="menu-icon" />
      </Button>
      <Drawer placement="left" width="70%" onClose={onClose} open={visible}>
        {/* User Info */}
        <div className="user-info">
          <Avatar icon={<UserOutlined />} size={32} />
          <div className="username">Kabali59</div>
        </div>

        {/* Balance Information */}
        <div className="balance-info">
          <div className="balance-title">
            <BankOutlined /> Balance Information
          </div>
          <div className="balance-amount">Available Balance: ₹ 0.00</div>
          <div className="balance-actions">
            <Button type="primary" onClick={() => handleNavigation("/deposit")}>Deposit</Button>
            <Button onClick={() => handleNavigation("/withdraw")}>Withdrawal</Button>
          </div>
        </div>

        {/* Menu List */}
        <List>
          <List.Item onClick={() => handleNavigation("/players")}>
            <HistoryOutlined /> Transactions History
          </List.Item>
          <List.Item onClick={() => handleNavigation("/change-password")}>
            <LockOutlined /> Change Password
          </List.Item>
          <List.Item onClick={() => handleNavigation("/bets")}>
            <UserOutlined /> My Bets
          </List.Item>
          <List.Item onClick={() => handleNavigation("/contact-us")}>
            <PhoneOutlined /> Contact Us
          </List.Item>
          <List.Item onClick={() => handleNavigation("/loginpage")} style={{ color: 'red' }}>
            <PoweroffOutlined /> Logout
          </List.Item>
        </List>
      </Drawer>
    </div>
  );
};

export default SideMenu;
