import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button, Card, message, Modal } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";
import { useNavigate } from "react-router-dom";

const ChatBox = ({
  currentBidId,
  userData,
  selectedPlayer,
  matchId,
  getPlayerDetailsByMatchId,
  setSelectedPlayer,
  getUserDetails,
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [lastBid, setLastBid] = useState();
  const [biddingOverModal, setBiddingOverModal] = useState(false);
  const [unSoldModal, setUnSoldModal] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleGoToPlayersList = () => {
    navigate(`/players-final-list/${matchId}`); // Change the path as per your route
  };

  const messagesEndRef = useRef(null);
  const inactivityTimer = useRef(null);
  const countdownRef = useRef(30);
  const countdownInterval = useRef(null);

  useEffect(() => {
    if (!currentBidId) return;
    const accessToken = Cookies.get("jwtToken");

    const fetchOldMessages = async () => {
      try {
        const response = await axios.get(
          `https://api.dreamsix.in/v1.0/dreamsix/api/chat/chat/getMatchMessages/${currentBidId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const sortedMessages = response?.data?.data?.responseDTOList.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setMessages(sortedMessages);

        checkForSoldMessage(sortedMessages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    };

    fetchOldMessages();
  }, [currentBidId]);

  useEffect(() => {
    const socket = new SockJS("https://api.dreamsix.in/v1.0/dreamsix/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);

          const sortedMessages = [...newMessage?.responseDTOList].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );

          setMessages(sortedMessages);
          checkForSoldMessage(sortedMessages);
          resetInactivityTimer();
        });

        setClient(stompClient);
      },
      onStompError: (error) => {
        console.error("STOMP Error:", error);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const checkForSoldMessage = (sortedMessages) => {
    if (sortedMessages.length === 0) return;

    const lastMessage = sortedMessages[sortedMessages.length - 1]?.message;

    if (lastMessage === "Sold") {
      const lastValidBid = findLastValidBid(sortedMessages);
      if (lastValidBid) {
        setLastBid(lastValidBid);
        setVisible(true);
      }
      getUserDetails();
    } else if (lastMessage === "Deny") {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) => msg.message !== "Sold" && msg.message !== "Deny"
        )
      );
      setVisible(false);
    } else if (lastMessage === "Done") {
      setVisible(false);
      getPlayerDetailsByMatchId();
      setSelectedPlayer();
      setMessages([]);
    } else if (lastMessage === "UnSold") {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.message !== "UnSold")
      );
      setUnSoldModal(true);
    } else if (lastMessage === "Un Sold Deny") {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) => msg.message !== "Un Sold Deny" && msg.message !== "UnSold"
        )
      );
      setUnSoldModal(false);
    } else if (lastMessage === "Un Sold Done") {
      setUnSoldModal(false);
      setMessages([]);
      getPlayerDetailsByMatchId();
      setSelectedPlayer();
    } else if (lastMessage === "Done Match") {
      setBiddingOverModal(true);
    }
  };

  const findLastValidBid = (messages) => {
    for (let i = messages.length - 2; i >= 0; i--) {
      const msg = messages[i];
      if (!isNaN(msg.message) && msg.message > 3) {
        return msg;
      }
    }
    return null;
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    clearInterval(countdownInterval.current);
    setCountdown(30);
    inactivityTimer.current = setTimeout(startCountdown, 1000);
  };

  const startCountdown = () => {
    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        console.log('prev', prev)
        if (prev <= 1) {
          clearInterval(countdownInterval.current);
          handleAutoMessages();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAutoMessages = async () => {
    const autoMessages = ["1", "2", "3"];
    for (let msg of autoMessages) {
      sendMessage(msg);
      resetInactivityTimer();
      await new Promise((res) => setTimeout(res, 10000));
    }
    finalizeAuction();
  };

  const finalizeAuction = async () => {
    const lastValidBid = findLastValidBid(messages);
    if (lastValidBid) {
      await axios.post("https://api.dreamsix.in/v1.0/dreamsix/api/chat/sold", {
        bidId: currentBidId,
        amount: lastValidBid.message,
        userId: lastValidBid.userId,
      });
    } else {
      await axios.post(
        "https://api.dreamsix.in/v1.0/dreamsix/api/chat/unsold",
        {
          bidId: currentBidId,
        }
      );
    }
  };

  const sendMessage = (amount) => {
    if (client && client.connected) {
      // Find the last valid numeric message
      let lastAmount = 0;
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i]?.message?.trim();

        if (msg && /^\d+$/.test(msg) && !["1", "2", "3"].includes(msg)) {
          // msg is a valid number and not 1, 2, or 3
          lastAmount = parseInt(msg, 10);
          break;
        }
      }

      let newAmount;

      if (messages.length > 0) {
        newAmount = lastAmount + amount;
      } else {
        newAmount = 1000 + amount;
      }

      if (newAmount > userData?.balance) {
        return message.error(
          "Your balance is insufficient for bidding, please deposite for continue bidding"
        );
      }

      const messageData = {
        username,
        userId: Cookies.get("userId"),
        bidId: currentBidId,
        messageContent: newAmount.toString(),
      };

      client.publish({
        destination: "/app/chat/sendMessage",
        body: JSON.stringify(messageData),
      });

      setMessages([...messages, { username, message: newAmount.toString() }]);
    } else {
      console.error("Cannot send message: STOMP connection not active.");
    }
  };

  console.log('countdown', countdown)

  const filteredMessages = messages?.filter(
    (message) =>
      message?.message !== "UnSold" &&
      message?.message !== "Un Sold Deny" &&
      message?.message !== "Sold" &&
      message?.message !== "Deny"
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  return (
    <body className="chat-container">
      <div className="bids-section">
        <div className="messages-container">
          {filteredMessages.map((bid, index) => {
            const isAdminMessage =
              isNaN(bid.message) || ["1", "2", "3"].includes(bid.message);

            return (
              <div
                key={index}
                className={
                  bid?.username === username ? "own-bid-card" : "bid-card"
                }
              >
                {bid?.username !== username && (
                  <div className="bid-user">{bid?.name?.charAt(0)}</div>
                )}

                <div className="bid-info">
                  <span className="bid-name">{bid?.name}</span>

                  {isAdminMessage ? (
                    <div className="admin-message">
                      <span className="bid-amount" style={{ color: "black" }}>
                        {bid?.message}
                      </span>
                    </div>
                  ) : (
                    <span className="bid-amount">{bid?.message}</span>
                  )}
                </div>

                {bid?.username === username && (
                  <div className="bid-user">{bid?.name?.charAt(0)}</div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {selectedPlayer && (
          <div className="chat-buttons ">
            <p className="countdown-timer">Time Left: {countdown}s</p>
            <div className="bidding-footer">
            {[50, 100, 200, 500].map((amount) => (
              <Button
                key={amount}
                className="send-btn"
                onClick={() => sendMessage(amount)}
              >
                +{amount}
              </Button>
            ))}
              </div>
          </div>
        )}
      </div>

      <Modal
        open={visible}
        // onCancel={onClose}
        closable={false}
        footer={null}
        className="customModal"
      >
        <Card className="playerCard">
          <div className="cardContent">
            <img
              src={selectedPlayer?.playerImage}
              alt={selectedPlayer?.playerName}
              className="playeImage"
            />
            <div className="playerInfo">
              <p className="playerName">{selectedPlayer?.playerName}</p>
              <p className="playerSoldBy">
                <span style={{ color: "whitesmoke" }}> Sold By: </span>
                {lastBid?.name}
              </p>
              <p className="playerPrice">
                <span style={{ color: "whitesmoke" }}> Sold Price: </span>
                {lastBid?.message}
              </p>
            </div>
          </div>
        </Card>
      </Modal>

      <Modal
        open={unSoldModal}
        // onCancel={onClose}
        closable={false}
        footer={null}
        className="customModal"
      >
        <Card className="playerCard">
          <div className="cardContent">
            <img
              src={selectedPlayer?.playerImage}
              alt={selectedPlayer?.playerName}
              className="playeImage"
            />
            <div className="playerInfo">
              <p className="playerName">{selectedPlayer?.playerName}</p>
              <p className="playerSoldBy">
                <span style={{ color: "whitesmoke" }}> Un Sold </span>
              </p>
            </div>
          </div>
        </Card>
      </Modal>

      <Modal
        open={biddingOverModal}
        // onCancel={onClose}
        footer={null}
        className="biddingOverModal"
      >
        <Card className="biddingCard">
          <div className="stampContainer">
            <div className="biddingOverStamp">BIDDING OVER</div>
          </div>
          <p className="finalListMessage">
            ✅ Go to <strong>Players List</strong> to see the final list of bid
            players!
          </p>
          <Button className="playersListButton" onClick={handleGoToPlayersList}>
            👉 Click here to go to Players List
          </Button>
        </Card>
      </Modal>
    </body>
  );
};

export default ChatBox;
