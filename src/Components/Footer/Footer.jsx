import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer = () => {
  const location = useLocation(); // Get the current route
  const [activeRoute, setActiveRoute] = useState(location.pathname); // Set the active route

  const navItems = [
    { path: "/homepage", label: "Home", icon: <HomeOutlined /> },
    { path: "/matchs-page", label: "Matches", icon: <TrophyOutlined /> },
    { path: "/players-list", label: "Players List", icon: <TeamOutlined /> },
    { path: "/rules", label: "Rules", icon: <BookOutlined /> },
    { path: "/bets", label: "My Bets", icon: <DollarCircleOutlined /> },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${activeRoute === item.path ? "active" : ""}`}
          onClick={() => setActiveRoute(item.path)} // Update active route on click
        >
          <Link to={item.path}>
            {React.cloneElement(item.icon, { style: { fontSize: "24px" } })}
            <p>{item.label}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Footer;
