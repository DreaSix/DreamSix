import React, { useEffect, useState } from "react";
import { Tabs, Card } from "antd";
import dayjs from "dayjs";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const { TabPane } = Tabs;

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [tomorrowMatches, setTomorrowMatches] = useState([]);

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = () => {
    matchDetailsService
      .getAllMatches()
      .then((response) => {
        const allMatches = response?.data || [];

        // Get today's and tomorrow's dates
        const today = dayjs().format("YYYY-MM-DD");
        const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

        // Filter today's matches
        const todayMatches = allMatches.filter((match) => 
          dayjs(match.countdownEndTime).format("YYYY-MM-DD") === today
        );

        // Filter tomorrow's matches
        const tomorrowMatches = allMatches.filter((match) => 
          dayjs(match.countdownEndTime).format("YYYY-MM-DD") === tomorrow
        );

        setMatches(allMatches);
        setTodayMatches(todayMatches);
        setTomorrowMatches(tomorrowMatches);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const renderMatches = (matchList) => {
    return matchList.length > 0 ? (
      matchList.map((match, index) => (
        <Card key={index} hoverable className="match-card">
          <img
            src={`data:image/jpeg;base64,${match?.matchImage}`}
            alt={`${match.teamOneName} vs ${match.teamTwoName}`}
          />
          <div className="match-details">
            <h3>{`${match.teamOneName} vs ${match.teamTwoName}`}</h3>
            <p>{dayjs(match.countdownEndTime).format("YYYY-MM-DD HH:mm")}</p>
          </div>
        </Card>
      ))
    ) : (
      <p className="no-matches">No matches available.</p>
    );
  };

  return (
    <main>
      <div className="match-page">
        <Tabs defaultActiveKey="1" centered className="custom-tabs">
          <Tabs.TabPane key="1" tab="Today Matches">
            {renderMatches(todayMatches)}
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Tomorrow Matches">
            {renderMatches(tomorrowMatches)}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </main>
  );
};

export default MatchPage;
