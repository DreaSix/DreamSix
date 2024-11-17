import React from "react";
import { Tabs, Card, Row, Col } from "antd";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const { TabPane } = Tabs;

const MatchPage = () => {
  const matches = [
    {
      team1: "IND",
      team2: "BAN",
      img: "https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png",
      countdown: "03:34:23",
    },
    {
      team1: "ENG",
      team2: "AUS",
      img: "https://img.jagranjosh.com/images/2023/November/3112023/england-vs-australia-head-to-head.jpg",
      countdown: "03:34:23",
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "Today Matches",
      content:
        matches && matches.length > 0 ? (
          matches.map((match, index) => (
            <Card
              key={index}
              hoverable
              style={{ marginBottom: "16px" }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={match.img}
                alt={`${match.team1} vs ${match.team2}`}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ textAlign: "center" }}>
                  {match.team1} vs {match.team2}
                </h3>
                <p
                  style={{
                    color: "#999",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {match.countdown}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No matches available for today.
          </p>
        ),
    },
    {
      key: "2",
      label: "Tomorrow Matches",
      content: (
        <p style={{ textAlign: "center", color: "#666" }}>
          No matches available for tomorrow.
        </p>
      ),
    },
  ];

  return (
    <div className="match-page">
      <Header />
      <Tabs
        defaultActiveKey="1"
        centered
        className="custom-tabs"
        items={tabItems.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: tab.content,
        }))}
      />
      <Footer />
    </div>
  );
};

export default MatchPage;
