import React from "react";
import { Modal, Card, Button } from "antd";
import './SoldModal.scss';  // Use regular SCSS import for global styles

const PlayerModal = ({ visible, onClose }) => {
  const playerData = {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroiIdtkhbBnuChXwxmM6dogPGQiYuzDM_VA&s",
    name: "AB Devilliers",
    soldBy: "Prasad Udutha",
    soldPrice: "₹ 6,000"
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="customModal"
    >
      <Card className="playerCard">
        <div className="cardContent">
          <img
            src={playerData.image}
            alt={playerData.name}
            className="playerImage"
          />
          <div className="playerInfo">
            <p className="playerName">{playerData.name}</p>
            <p className="playerSoldBy"> <span style={{color:"whitesmoke"}}> Sold By : </span>{playerData.soldBy}</p>
            <p className="playerPrice"><span style={{color:"whitesmoke"}}> Sold By :</span> {playerData.soldPrice}</p>
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
  );
};

export default PlayerModal;
