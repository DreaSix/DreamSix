import React, { useEffect, useState } from "react";
import { Tabs, Card } from "antd";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const { TabPane } = Tabs;

const MatchPage = () => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getAllMatches()
  }, [])

  const getAllMatches = () => {
    matchDetailsService.getAllMatches()
      .then(response => {
        setMatches(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }


  const tabItems = [
    {
      key: "1",
      label: "Today Matches",
      content:
        matches && matches.length > 0 ? (
          matches.map((match, index) => (
            <Card key={index} hoverable className="match-card">
              <img
                src={`data:image/jpeg;base64,${match?.matchImage}`}
                alt={`${match.teamOneName} vs ${match.teamTwoName}`}
              />
              {/* <div className="match-info">
                <h3>
                  {match.teamOneName} vs {match.teamTwoName}
                </h3>
                <p>{match.countdown}</p>
              </div> */}
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
    <main>
      <div className="match-page">
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
    </div>
    </main>
  );
};

export default MatchPage;
