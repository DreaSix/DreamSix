import React, { useState, useEffect } from "react";
import "./Leaderboard.scss"; // Import SCSS

const initialPlayers = [
  { id: 1, name: "Virat Kohli", fours: 6, sixes: 3 },
  { id: 2, name: "Rohit Sharma", fours: 8, sixes: 5 },
  { id: 3, name: "David Warner", fours: 5, sixes: 4 },
  { id: 4, name: "Steve Smith", fours: 7, sixes: 2 },
  { id: 5, name: "Kane Williamson", fours: 4, sixes: 3 },
  { id: 6, name: "Babar Azam", fours: 9, sixes: 4 },
  { id: 7, name: "Jos Buttler", fours: 6, sixes: 6 },
  { id: 8, name: "KL Rahul", fours: 5, sixes: 3 },
  { id: 9, name: "Faf du Plessis", fours: 4, sixes: 5 },
  { id: 10, name: "Glenn Maxwell", fours: 3, sixes: 7 },
  { id: 11, name: "Ben Stokes", fours: 4, sixes: 2 },
  { id: 12, name: "Shubman Gill", fours: 5, sixes: 3 },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    // Sort players by total boundary runs (fours * 4 + sixes * 6)
    const sortedPlayers = [...players].sort(
      (a, b) => b.fours * 4 + b.sixes * 6 - (a.fours * 4 + a.sixes * 6)
    );
    setPlayers(sortedPlayers);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏏 TopSix Leaderboard 🏆</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id} className={index === 0 ? "top-player" : ""}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>
                <span className="fours">{player.fours}×4</span> |{" "}
                <span className="sixes">{player.sixes}×6</span> |{" "}
                <span className="total-runs">{player.fours * 4 + player.sixes * 6}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
