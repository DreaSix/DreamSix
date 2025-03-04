import React, { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";

const ChatBox = ({currentBidId}) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);

  // useEffect(() => {
  //   const fetchOldMessages = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/chat/messages/${currentBidId}`);
  //       const sortedMessages = response.data.sort(
  //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  //       );
  //       setMessages(sortedMessages);
  //     } catch (error) {
  //       console.error("Error fetching old messages:", error);
  //     }
  //   };

  //   fetchOldMessages();

  //   const socket = new SockJS("http://localhost:8080/ws");
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log("Connected to WebSocket");

  //       stompClient.subscribe("/topic/public", (message) => {
  //         const newMessage = JSON.parse(message.body);
  //         console.log("newMessage", newMessage);

  //         setMessages((prevMessages) => {
  //           const updatedMessages = [...prevMessages, newMessage];
  //           return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  //         });
  //       });

  //       setClient(stompClient);
  //     },
  //     onStompError: (error) => {
  //       console.error("STOMP Error:", error);
  //     },
  //   });

  //   stompClient.activate();

  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, [currentBidId]);

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

  const sendMessage = (amount) => {
    if (client && client.connected) {
      const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;
      const lastAmount = lastMessage ? parseInt(lastMessage.message) || 0 : 0;

      const newAmount = lastAmount + amount;

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
        { username, messageContent: newAmount.toString() },
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
          bid?.username?.username === username ? (
            <div className="bid-card" key={index}>
              <div className="bid-user">{bid?.name?.charAt(0)}</div>
              <div className="bid-info">
                <span className="bid-name">{bid?.name}</span>
                <span className="bid-amount">{bid?.message}</span>
              </div>
              
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
    </body>
    </main>
  );
};

export default ChatBox;
