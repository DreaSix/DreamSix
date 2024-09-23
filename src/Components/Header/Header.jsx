import React from "react"
import { UserOutlined } from "@ant-design/icons"
import { Button } from "antd"
import "./Header.scss"
import { redirect, useNavigate } from "react-router-dom"
import Logo from '../../assets/logo.jpeg'

const Header = () => {
  const navigate = useNavigate();

  const onDeposit  = () => {
    navigate("/depositpage");
  };
    return (
        <div className="header">
        <img src={Logo} alt="DreamSix Logo" className="logo" />
        <div className="header-actions">
          <div className="user-profile">
            <UserOutlined />
          </div>
          <Button onClick={onDeposit} className="deposit-button">Deposit</Button>
          <div className="balance">0.00</div>
        </div>
      </div>
    )
}

export default Header