import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../../assets/logo.jpeg";
import "./Header.scss";
import SideMenu from "./SideMenu";
import { userService } from "../../Service/UserService";

const Header = () => {
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

  return (
    <div className="header">
      <div className="menu-container">
        <SideMenu />
      </div>
      <img src={Logo} alt="DreamSix Logo" className="logo" />
      <div className="header-actions">
        {/* <Button onClick={onDeposit} className="deposit-button">
          Deposit
        </Button> */}
        <div className="balance">₹ {userWallet}</div>
      </div>
    </div>
  );
};

export default Header;
