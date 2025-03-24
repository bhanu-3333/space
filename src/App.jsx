import React from "react";
import GameCanvas from "./components/GameCanvas";
import "./styles/Game.css";

function App() {
  return (
    <div className="game-container">
      <h1>🚀 Space Shooter Game</h1>
      <GameCanvas />
    </div>
  );
}

export default App;