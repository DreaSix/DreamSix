import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const HomePage = () => {
  const { Text } = Typography;

  const [matches, setMatches] = useState([])

  const [winnersList, setWinnersList] = useState([])

  useEffect(() => {
    getWinnersList()
  }, [])

  const getWinnersList = () => {
    matchDetailsService.getWinners()
      .then(response => {
        setWinnersList(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
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

  return (
    <main>
      <div className="landing-page">

        <div className="content-area">
          <div className="section matches-section">
            <Carousel autoplay dots infinite>
              {matches.map((match) => (
                <div key={match.matchId}>
                  <Card className="match-cards" hoverable>
                    <img
                      src={`data:image/jpeg;base64,${match?.matchImage}`}
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
                onClick={() =>  handleNavigation("/updates")}
              >
                Updates
              </Button>
            </Col>
          </Row>

          {/* Recent Winners */}
          <section className="recent-winners">
            <h2>DreamSix Recent Winners</h2>
            {winnersList?.map(winner => (
              <Card className="winner-card">
                <Row align="middle">
                  <Col>
                    <div className="winner-badge">
                      <img src={"http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Winner" />
                    </div>
                  </Col>
                  <Col>
                    <Text className="winner-name">{winner?.winnerName?.name}</Text>
                    <br />
                    <Text className="winner-match">{winner?.matchDetailsResponse?.matchName}</Text>
                  </Col>
                  <Col flex="auto" />
                  <Col>
                    <Text className="winner-prize">₹ {winner?.winnerAmount}</Text>
                    <br />
                    <Button className="top-sixer-button">{winner?.matchDetailsResponse?.matchAction}</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </section>
        </div>

      </div>
    </main>
  );
};

export default HomePage;
