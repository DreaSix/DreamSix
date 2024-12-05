import React from "react";
import { Button, Card, Carousel, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Homepage.scss";

const matches = [
  {
    id: 1,
    image:
      "https://img.jagranjosh.com/images/2024/April/242024/RCB-vs-LSG-today.jpg",
    details: "Today Afternoon 2:00 PM",
    countdown: "03:34:23",
  },
  {
    id: 2,
    image:
      "https://img.jagranjosh.com/images/2024/March/2932024/KKR-vs-RCB-tODAY.jpg",
    details: "Today Morning 6:00 AM",
    countdown: "05:12:15",
  },
  {
    id: 3,
    image:
      "https://st1.latestly.com/wp-content/uploads/2018/04/M27-IPL-CSK-vs-MI-Live-Update-781x441.jpg",
    details: "Tomorrow Evening 4:00 PM",
    countdown: "02:45:30",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const onClickMatchImage = () => {
    navigate("/auction-type");
  };

  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} button clicked`);
  };
  const handleNavigation = (path) => {
    navigate(path);
    
  };

  return (
    <div className="landing-page">
      <Header />

      <div className="content-area">
        {/* Today Matches */}
        <div className="section matches-section">
          <h3>Today Matches</h3>
          <Carousel autoplay dots infinite>
            {matches.map((match) => (
              <div key={match.id}>
                <Card className="match-cards" hoverable>
                  <img
                    src={match.image}
                    alt={`Match ${match.id}`}
                    onClick={onClickMatchImage}
                    className="match-image"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="match-details">
                    <p>{match.details}</p> {/* Details on the left */}
                    <p className="countdown">{match.countdown}</p> {/* Countdown on the right */}
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
              onClick={() => handleButtonClick("Withdraw")}
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

      <Footer />
    </div>
  );
};

export default HomePage;
