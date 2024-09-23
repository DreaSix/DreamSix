import { BookOutlined, DollarCircleOutlined, HomeOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons"
import React from "react"
import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
    return(
        <div className="bottom-nav">
        <div className="nav-item">
          <Link to="/">
            <HomeOutlined style={{ fontSize: '24px' }} />
            <p>Home</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/matches">
            <TrophyOutlined style={{ fontSize: '24px' }} />
            <p>Matches</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/players">
            <TeamOutlined style={{ fontSize: '24px' }} />
            <p>Players List</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/rules">
            <BookOutlined style={{ fontSize: '24px' }} />
            <p>Rules</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/bets">
            <DollarCircleOutlined style={{ fontSize: '24px' }} />
            <p>My Bets</p>
          </Link>
        </div>
      </div>
    )
}


export default Footer