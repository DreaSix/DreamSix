import React, { useEffect, useState } from "react";
import { Button, Drawer, Avatar, List } from "antd";
import { UserOutlined, BankOutlined, LockOutlined, HistoryOutlined, PhoneOutlined, PoweroffOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideMenu.scss";
import Cookies from "js-cookie";

import { Color } from "antd/es/color-picker";
import { userService } from "../../Service/UserService";

const SideMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [userWallet, setUserWallet] = useState(0)

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
    <div className="side-menu" >
      {/* Menu Button */}
      <Button type="text" onClick={showDrawer} className="menu-icon-button">
        <MenuOutlined className="menu-icon" />
      </Button>
      <Drawer placement="left" width="70%" onClose={onClose} open={visible} style={{background:" linear-gradient(to top, #99ccff 0%, #003366 100%)", color:"white"}}>
        {/* User Info */}
        <div className="user-info" style={{display:"flex", alignItems:"center"}}>
          <Avatar style={{marginRight:"15px", border:"1px solid yellow"}} icon={<UserOutlined />} size={32} />
          <div className="username" style={{color:"yellow",fontWeight:"bold"}}>Kabali59</div>
        </div>

        <hr/>

        {/* Balance Information */}
        <div className="balance-info">
          <div style={{marginTop:"10px", marginBottom:"10px", color:"white",fontWeight:"bold", }} className="balance-title">
            <BankOutlined style={{fontSize:"25px", marginRight:"15px", color:"white"}} className="icon" /> Balance Information
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", color:"white"}}>
            <p>Available Balance: </p>
            <p>₹ {userWallet}</p>
          </div>
          <hr/>
          <div style={{marginTop:"10px", marginBottom:"10px", color:"white"}} className="balance-actions">
            <Button  style={{marginRight:"10px", backgroundColor:"#ffd700",}} onClick={() => handleNavigation("/depositpage")}>Deposit</Button>
            <Button onClick={() => handleNavigation("/withdraw")}>Withdrawal</Button>
          </div>
        </div>

        <hr/>

        {/* Menu List */}
        <List >
          <List.Item onClick={() => handleNavigation("/transactions")} style={{ color:"white"}}>
            <HistoryOutlined style={{ color:"white"}} /> Transactions History
          </List.Item>
          <List.Item onClick={() => handleNavigation("/change-password")} style={{ color:"white"}}>
            <LockOutlined /> Change Password
          </List.Item>
          <List.Item onClick={() => handleNavigation("/bets")} style={{ color:"white"}}>
            <UserOutlined /> My Bets
          </List.Item>
          <List.Item onClick={() => handleNavigation("/contact-us")} style={{ color:"white"}}>
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
