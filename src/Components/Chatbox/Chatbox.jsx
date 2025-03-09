import React, { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button, Card, message, Modal } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";

const ChatBox = ({currentBidId, userData, selectedPlayer}) => {
  console.log('userData', userData)
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);
  const [visible, setVisible] =useState(false)

  useEffect(() => {
    if (!currentBidId) return; 
    const accessToken = Cookies.get("jwtToken")
    const fetchOldMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/chat/getMatchMessages/${currentBidId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add access token to headers
              "Content-Type": "application/json",
            },
          }
        );
        console.log('response?.data', response?.data?.data)
        const sortedMessages = response?.data?.data?.responseDTOList.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        console.log('sortedMessages', sortedMessages)
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    };

    fetchOldMessages();
  }, [currentBidId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("newMessage", newMessage);

          const sortedMessages = [...newMessage?.responseDTOList].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );

          setMessages(sortedMessages);
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

  const onClose = () => {
    setVisible(false)
  }

  const sendMessage = (amount) => {
    console.log('amount', amount)
    
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

      if (messages.length > 0){
        newAmount = lastAmount + amount;
      }else{
        newAmount = 1000 + amount
      }

      if (newAmount > userData?.balance){
        return message.error("Your balance is insufficient for bidding, please deposite for continue bidding")
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
      
  
      setMessages([
        ...messages,
        { username, message: newAmount.toString() },
      ]);
    } else {
      console.error("Cannot send message: STOMP connection not active.");
    }
  };

  console.log("messages", messages);

  return (
    <main>
      <body className="chat-container">
      <div className="bids-section">
        {messages.map((bid, index) =>
          bid?.username === username ? (
            <div className="own-bid-card" key={index}>
              <div className="bid-info">
                <span className="bid-name">{bid?.name}</span>
                <span className="bid-amount">{bid?.message}</span>
              </div>
              <div className="bid-user">{bid?.name?.charAt(0)}</div>
            </div>
          ) : (
            <div className="bid-card" key={index}>
              <div className="bid-user">{bid?.name?.charAt(0)}</div>
              <div className="bid-info">
                <span className="bid-name">{bid?.name}</span>
                <span className="bid-amount">{bid?.message}</span>
              </div>
            </div>
          )
        )}
      </div>
      {/* {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.username === username ? "own" : ""}`}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))} */}
      <div className="chat-buttons bidding-footer">
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

      <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="customModal"
    >
      <Card className="playerCard">
        <div className="cardContent">
          <img
            src={`data:image/jpeg;base64,${selectedPlayer?.playerImage}`}
            alt={selectedPlayer?.playerName}
            className="playeImage"
          />
          <div className="playerInfo">
            <p className="playerName">{selectedPlayer?.playerName}</p>
            <p className="playerSoldBy"> <span style={{color:"whitesmoke"}}> Sold By : </span>{selectedPlayer?.userResponseVO?.Name}</p>
            <p className="playerPrice"><span style={{color:"whitesmoke"}}> Sold By :</span> {selectedPlayer?.soldPrice}</p>
          </div>
        </div>

        <div className="buttonGroup">
          <Button className="actionButton undoButton" onClick={onClose}>
            Undo
          </Button>
          <Button className="actionButton doneButton" onClick={onClose}>
            Done
          </Button>
        </div>
      </Card>
    </Modal>
    </body>
    </main>
  );
};

export default ChatBox;
