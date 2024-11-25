import React from "react";
import { Button, Card, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { WhatsAppOutlined } from "@ant-design/icons";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Homepage.scss";

const matches = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/a1/de/a2/a1dea2cf213703688b3d040e1c112a53.png",
    details: "Today Afternoon 2:00 PM",
    countdown: "03:34:23",
  },
  {
    id: 2,
    image:
      "https://images.news9live.com/wp-content/uploads/2024/10/India-vs-Australia-womens-t20-World-Cup.jpg?w=1200&enlarge=true",
    details: "Today Morning 6:00 AM",
    countdown: "05:12:15",
  },
  {
    id: 3,
    image:
      "https://i.ytimg.com/vi/ZZ7QIRihNic/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB_cpHVO8pSXdYSNASbuU4hASQvPA",
    details: "Tomorrow Evening 4:00 PM",
    countdown: "02:45:30",
  },
  // Add more match cards as needed
];

const HomePage = () => {
  const navigate = useNavigate();

  const onClickMatchImage = () => {
    navigate("/auction-type");
  };

  return (
    <div className="landing-page">
      <Header />

      <div className="content-area">
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
                    <p>{match.details}</p>
                    <p className="countdown">{match.countdown}</p>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>

       
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
