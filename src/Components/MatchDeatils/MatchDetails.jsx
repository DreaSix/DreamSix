import React, { useEffect, useState } from "react";
import { Tabs, Card } from "antd";
import dayjs from "dayjs";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [tomorrowMatches, setTomorrowMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

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
        const todayMatches = allMatches.filter(
          (match) => dayjs(match.countdownEndTime).format("YYYY-MM-DD") === today
        );

        // Filter tomorrow's matches
        const tomorrowMatches = allMatches.filter(
          (match) => dayjs(match.countdownEndTime).format("YYYY-MM-DD") === tomorrow
        );

        // Filter upcoming matches (after tomorrow)
        const upcomingMatches = allMatches.filter(
          (match) => dayjs(match.countdownEndTime).isAfter(dayjs(tomorrow), "day")
        );

        setMatches(allMatches);
        setTodayMatches(todayMatches);
        setTomorrowMatches(tomorrowMatches);
        setUpcomingMatches(upcomingMatches);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const navigate = useNavigate();

  const onClickMatchImage = (matchId) => {
    navigate(`/auction-type/${matchId}`);
  };

  const renderMatches = (matchList) => {
    return matchList.length > 0 ? (
      matchList.map((match, index) => (
        <Card  onClick={() => onClickMatchImage(match?.matchId)} key={index} hoverable className="match-card">
          <img
            src={match?.matchImage}
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
          <TabPane key="1" tab="Today Matches">
            {renderMatches(todayMatches)}
          </TabPane>
          <TabPane key="2" tab="Tomorrow Matches">
            {renderMatches(tomorrowMatches)}
          </TabPane>
          <TabPane key="3" tab="Upcoming Matches">
            {renderMatches(upcomingMatches)}
          </TabPane>
        </Tabs>
      </div>
    </main>
  );
};

export default MatchPage;
