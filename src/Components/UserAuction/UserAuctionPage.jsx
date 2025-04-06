import React, { useEffect, useState } from "react";
import "../UserAuction/UserAuctionPage.scss";
import Footer from "../Footer/Footer";
import { Badge, Button, Card, Modal } from "antd";
import ChatBox from "../Chatbox/Chatbox";
import { useNavigate, useParams } from "react-router-dom";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { userService } from "../../Service/UserService";
import Cookies from "js-cookie";

const USerAuctionPage = () => {
  const navigate = useNavigate();

  const { matchId } = useParams();
  const [showNextPlayers, setShowNextPlayers] = useState(false);
  const [matchData, setMatchDetails] = useState(null);
  const [nextPlayers, setNextPlayers] = useState({});
  const [soldPlayers, setSoldPlayers] = useState({});
  const [unSoldPlayers, setUnSoldPlayers] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [currentBidId, setCurrentBidId] = useState();
  const [biddingOverModal, setBiddingOverModal] = useState(false);

  const [userData, setUserData] = useState(0);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    userService
      .getUser(Cookies.get("userId"))
      .then((response) => {
        setUserData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    let interval;

    if (!selectedPlayer && !biddingOverModal) {
      interval = setInterval(() => {
        console.log("Fetching player details...");
        getPlayerDetailsByMatchId();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [selectedPlayer, biddingOverModal]);

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, [matchId]);

  const getMatchDetailsById = () => {
    matchDetailsService
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchDetails(response?.data);
      })
      .catch((error) => {
        console.log("Error fetching match details:", error);
      });
  };

  useEffect(() => {
    if (matchId) {
      getPlayerDetailsByMatchId();
    }
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService
      .getMatchPlayerDetails(matchId)
      .then((response) => {
        if (!response?.data) {
          console.log("No match data found");
          return;
        }

        const nextPlayers = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "UNSOLD"
          )
        );

        const unSoldPlayers = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "UN_SOLD"
          )
        );

        const soldPlayers = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "SOLD"
          )
        );

        const biddingPlayer = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "BIDDING"
          )
        );

        if (nextPlayers.length === 0 && biddingPlayer.length === 0) {
          setBiddingOverModal(true);
          setSelectedPlayer(null);
          setCurrentBidId(null);
          return;
        }

        setCurrentBidId(biddingPlayer[0]?.bidId);
        setSelectedPlayer(biddingPlayer[0]);

        setUnSoldPlayers(unSoldPlayers);
        setNextPlayers(nextPlayers);
        setSoldPlayers(soldPlayers);
      })
      .catch((error) => {
        console.log("Error fetching player details:", error);
      });
  };

  const handleGoToPlayersList = () => {
    navigate(`/players-final-list/${matchId}`); // Change the path as per your route
  };

  return (
    <main>
      <div className="player-page">
        <div className="header">
          <div className="header-left">
            <img
              src={matchData?.matchImage}
              alt="team logo"
              className="team-logo"
            />
            {/* <div>
            <h2>Narasimha</h2>
            <p className="status">Online</p>
          </div> */}
          </div>
          <button className="top-sixer-btn">Top Sixer</button>
          <button className="top-sixer-btn">
            {userData?.balance ? userData?.balance : 0}
          </button>
        </div>

        <div className="players-section">
          <Button
            className="dropdown-btn"
            onClick={() => setShowNextPlayers(!showNextPlayers)}
          >
            {showNextPlayers ? "Hide Players" : "Players List"}
          </Button>

          {showNextPlayers && (
            <div className="next-players">
              <h3>Next Players</h3>
              <div className="players">
                {nextPlayers?.map((player) => (
                  <div className="player-card" key={player.playerName}>
                    <img
                      src={player?.playerImage}
                      alt={player.playerName}
                      className="player-img"
                    />
                    <div className="player-name">{player.playerName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="players-section">
          {showNextPlayers && (
            <div className="next-players">
              <h3>Sold Players</h3>
              <div className="players">
                {soldPlayers?.map((player) => (
                  <div className="player-card" key={player.playerName}>
                    <img
                      src={player?.playerImage}
                      alt={player.playerName}
                      className="player-img"
                    />
                    <div className="player-name">{player.playerName}</div>
                    <div>{player?.soldPrice}</div>
                    <div>Buyer: {player?.userResponseVO?.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="players-section">
          {showNextPlayers && (
            <div className="next-players">
              <h3>Un Sold Players</h3>
              <div className="players">
                {unSoldPlayers?.map((player) => (
                  <div className="player-card" key={player.playerName}>
                    <img
                      src={player?.playerImage}
                      alt={player.playerName}
                      className="player-img"
                    />
                    <div className="player-name">{player.playerName}</div>
                    <div>{player?.soldPrice}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedPlayer && (
          <div className="player-info">
            <img
              src={selectedPlayer?.playerImage}
              alt={selectedPlayer?.playerName}
              className="selected-player-img"
            />
            <div className="player-details">
              <span className="selected-player-name">
                {selectedPlayer?.playerName}
              </span>
              <span className="starting-price">
                Starting Price: <strong>Rs. {selectedPlayer?.basePrice}</strong>
              </span>
            </div>
          </div>
        )}

        <ChatBox
          currentBidId={currentBidId}
          selectedPlayer={selectedPlayer}
          userData={userData}
          matchId={matchId}
          getPlayerDetailsByMatchId={getPlayerDetailsByMatchId}
          setSelectedPlayer={setSelectedPlayer}
          getUserDetails={getUserDetails}
        />

        <Modal
          open={biddingOverModal}
          // onCancel={onClose}
          closable={false}
          footer={null}
          className="biddingOverModal"
          style={{
            borderRadius: "12px",
            backgroundColor: "#1C3A56",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Card
            className="biddingCard"
            style={{
              backgroundColor: "#1C3A56",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className="stampContainer"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                className="biddingOverStamp"
                style={{
                  background: "rgba(255, 0, 0, 0.8)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                BIDDING OVER
              </div>
            </div>
            <p
              className="finalListMessage"
              style={{
                color: "#ccee22",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              ✅ Go to <strong>Players List</strong> to see the final list of
              bid players!
            </p>
            <Button
              className="playersListButton"
              style={{
                backgroundColor: "#f4c430",
                color: "#1C3A56",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={handleGoToPlayersList}
            >
              👉 Click here to go to Players List
            </Button>
          </Card>
        </Modal>

        <Footer />
      </div>
    </main>
  );
};

export default USerAuctionPage;
