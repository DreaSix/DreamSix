import React from "react"
import { UserOutlined } from "@ant-design/icons"
import { Button } from "antd"
import "./Header.scss"

const Header = () => {
    return (
        <div className="header">
        <img src="/path-to-logo.png" alt="DreamSix Logo" className="logo" />
        <div className="header-actions">
          <div className="user-profile">
            <UserOutlined />
          </div>
          <Button className="deposit-button">Deposit</Button>
          <div className="balance">0.00</div>
        </div>
      </div>
    )
}

export default Header