import React from "react";
import { Tabs, Card } from "antd";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const { TabPane } = Tabs;

const MatchPage = () => {
  const matches = [
    {
      team1: "RCB",
      team2: "CSK",
      img: "https://i.pinimg.com/originals/a1/de/a2/a1dea2cf213703688b3d040e1c112a53.png",
      countdown: "03:34:23",
    },
    {
      team1: "IND",
      team2: "AUS",
      img: "https://images.news9live.com/wp-content/uploads/2024/10/India-vs-Australia-womens-t20-World-Cup.jpg?w=1200&enlarge=true",
      countdown: "03:34:23",
    },
    {
      team1: "RCB",
      team2: "CSK",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/poster-design-template-351effd160d6232fa505498a400cd1a1_screen.jpg?ts=1713411077",
      countdown: "03:34:23",
    },
    {
      team1: "IND",
      team2: "AUS",
      img: "https://images.news9live.com/wp-content/uploads/2024/10/India-vs-Australia-womens-t20-World-Cup.jpg?w=1200&enlarge=true",
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
            <Card key={index} hoverable className="match-card">
              <img
                src={match.img}
                alt={`${match.team1} vs ${match.team2}`}
              />
              <div className="match-info">
                <h3>
                  {match.team1} vs {match.team2}
                </h3>
                <p>{match.countdown}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="no-matches">No matches available for today.</p>
        ),
    },
    {
      key: "2",
      label: "Tomorrow Matches",
      content: <p className="no-matches">No matches available for tomorrow.</p>,
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
