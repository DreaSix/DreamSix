import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const HomePage = () => {
  const { Text } = Typography;

  const [matches, setMatches] = useState([]);

  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    getWinnersList();
  }, []);

  const getWinnersList = () => {
    matchDetailsService
      .getWinners()
      .then((response) => {
        const winners = response?.data || [];
        const groupedWinners = groupWinnersByMatch(winners);
        setWinnersList(groupedWinners);
      })
      .catch((error) => {
        console.log("Error fetching winners:", error);
      });
  };

  const groupWinnersByMatch = (winners) => {
    return winners.reduce((acc, winner) => {
      const matchId = winner?.matchDetailsResponse?.matchId;
      if (!acc[matchId]) {
        acc[matchId] = {
          matchDetails: winner.matchDetailsResponse,
          winners: [],
        };
      }
      acc[matchId].winners.push(winner);
      return acc;
    }, {});
  };
  const navigate = useNavigate();

  const onClickMatchImage = (matchId) => {
    navigate(`/auction-type/${matchId}`);
  };
  const onClickWithdrawl = () => {
    navigate("/withdrawl");
  };

  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} button clicked`);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = () => {
    matchDetailsService
      .getMatches()
      .then((response) => {
        const currentDate = new Date();
        
        // Filter matches where countdownEndTime is still valid
        const validMatches = response?.data?.filter((match) => {
          const matchEndTime = new Date(match.countdownEndTime);
          matchEndTime.setDate(matchEndTime.getDate() + 1); // Shift by one day
  
          return matchEndTime > currentDate; // Display if still valid
        });
  
        setMatches(validMatches);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <main>
      <div className="landing-page">
        <div className="content-area">
          <div className="section matches-section">
            <Carousel autoplay dots infinite>
              {matches?.map((match) => (
                <div key={match.matchId}>
                  <Card className="match-cards" hoverable>
                    <img
                      src={match?.matchImage}
                      alt={`Match ${match.matchId}`}
                      onClick={() => onClickMatchImage(match?.matchId)}
                      className="match-image"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="match-details">
                      <p>{match.details}</p>
                      <p className="countdown">{match.countdown}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Buttons Section */}
          <Row justify="center" className="buttons-container">
            <Col>
              <Button
                className="deposit-button green-button"
                onClick={() => handleNavigation("/depositpage")}
              >
                Deposit
              </Button>
              <Button
                className="withdraw-button red-button"
                onClick={() => onClickWithdrawl("/withdrawl")}
              >
                Withdraw
              </Button>
              <Button
                className="updates-button blue-button"
                onClick={() => handleNavigation("/updates")}
              >
                Updates
              </Button>
            </Col>
          </Row>

          {/* Recent Winners */}
          <section className="recent-winners">
            <h2>DreamSix Recent Winners</h2>
            {Object.values(winnersList).map((match) => (
              <Card key={match.matchDetails.matchId} className="winner-card">
                <Row align="middle">
                  <Col span={24}>
                    <Typography.Title level={4} className="winner-match">
                      {match?.matchDetails?.matchName}
                    </Typography.Title>
                  </Col>
                </Row>
                {match?.winners.map((winner, index) => (
                  <Row align="middle" key={index} className="winner-details">
                    <Col>
                      <div className="winner-badge">
                        <img
                          src={winner?.playerDetailsResponse?.playerImage}
                          alt="Winner"
                        />
                      </div>
                    </Col>
                    <Col>
                      <Text className="winner-name">
                        {winner?.winnerName?.name}
                      </Text>
                    </Col>
                    <Col flex="auto" />
                    <Col>
                      <Text className="winner-prize">
                        ₹ {winner?.winnerAmount}
                      </Text>
                      <br />
                      <Button className="top-sixer-button">Top Sixer</Button>
                    </Col>
                  </Row>
                ))}
              </Card>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
