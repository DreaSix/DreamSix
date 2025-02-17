import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

import "./Chatbox.scss";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Use SockJS endpoint
    const stompClient = new Client({
      webSocketFactory: () => socket, // SockJS integration
      reconnectDelay: 5000, // Reconnect after 5 seconds if connection fails
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log('newMessage', newMessage);

          // Sort messages by timestamp in ascending order (oldest first)
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


  console.log('messages', messages)

  const sendMessage = () => {
    if (message.trim() !== "" && client && client.connected) {
      
      const messageData = {
        username,
        bidId: "5d47ed3a-8372-4e72-87d3-55383bba1cad",
        messageContent: message,
      };

      client.publish({
        destination: "/app/chat/sendMessage",
        body: JSON.stringify(messageData),
      });

      setMessage("");
    } else {
      console.error("Cannot send message: STOMP connection not active.");
    }
  };

  return (
    <div className="chat-container">
      <h3>Live Chat</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.username === username ? "own" : ""}`}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
