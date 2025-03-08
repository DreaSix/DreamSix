import React from "react";
import { Modal, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./BiddingOverModal.scss"; // Import the SCSS file

const BiddingOverModal = ({ visible, onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoToPlayersList = () => {
    navigate("/players-list"); // Change the path as per your route
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="biddingOverModal"
    >
      <Card className="biddingCard">
        <div className="stampContainer">
          <div className="biddingOverStamp">BIDDING OVER</div>
        </div>
        <p className="finalListMessage">
          ✅ Go to <strong>Players List</strong> to see the final list of bid players!
        </p>
        <Button className="playersListButton" onClick={handleGoToPlayersList}>
          👉 Click here to go to Players List
        </Button>
      </Card>
    </Modal>
  );
};

export default BiddingOverModal;
