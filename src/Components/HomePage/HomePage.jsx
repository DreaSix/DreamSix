import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Homepage.scss";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const HomePage = () => {
  const [matches, setMatches] = useState([])
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
            <h3>Today Matches</h3>
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
                onClick={() => handleButtonClick("Updates")}
              >
                Updates
              </Button>
            </Col>
          </Row>

          {/* Recent Winners */}
          <section className="recent-winners">
            <h2>Recent Winners</h2>
            {[{ name: "Aditya Chatterjee", match: "IND v AUS", amount: "₹45,000" },
            { name: "Rahul Gupta", match: "ENG v SA", amount: "₹30,000" },
            { name: "Aditya Chatterjee", match: "IND v AUS", amount: "₹45,000" },
            ].map((winner, index) => (
              <Card key={index} className="winner-card">
                <Row align="middle" justify="space-between">
                  <Col>
                    <div className="winner-info">
                      <img
                        src="https://tse3.mm.bing.net/th?id=OIP.szlODdPxBbApegAVzrKzXwHaHa&pid=Api&P=0&h=180"
                        alt={winner.name}
                      />
                      <div>
                        <h3>{winner.name}</h3>
                        <span>{winner.match}</span>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <span className="amount">{winner.amount}</span>
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
