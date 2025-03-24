import React, { useEffect, useRef, useState } from "react";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 235, y: 450 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw spaceship
      ctx.fillStyle = "blue";
      ctx.fillRect(player.x, player.y, 30, 30);
      
      // Move and draw bullets
      setBullets((prevBullets) =>
        prevBullets
          .map((b) => ({ ...b, y: b.y - 7 })) // Increased bullet speed
          .filter((b) => b.y > 0)
      );
      bullets.forEach((b) => {
        ctx.fillStyle = "red";
        ctx.fillRect(b.x, b.y, 5, 10);
      });

      // Spawn enemies
      if (Math.random() < 0.02) {
        setEnemies([...enemies, { x: Math.random() * 470, y: 0 }]);
      }

      // Move and draw enemies
      setEnemies((prevEnemies) =>
        prevEnemies
          .map((e) => ({ ...e, y: e.y + 3 })) // Adjusted enemy speed
          .filter((e) => e.y < 500)
      );
      enemies.forEach((e) => {
        ctx.fillStyle = "green";
        ctx.fillRect(e.x, e.y, 30, 30);
      });

      // Check for collisions
      bullets.forEach((b, bulletIndex) => {
        enemies.forEach((e, enemyIndex) => {
          if (
            b.x < e.x + 30 &&
            b.x + 5 > e.x &&
            b.y < e.y + 30 &&
            b.y + 10 > e.y
          ) {
            setEnemies((prev) => prev.filter((_, i) => i !== enemyIndex));
            setBullets((prev) => prev.filter((_, i) => i !== bulletIndex));
            setScore((prev) => prev + 10);
          }
        });
      });

      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }, [player, bullets, enemies]);

  // Controls
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) {
      setPlayer({ ...player, x: player.x - 15 }); // Adjusted player speed
    }
    if (e.key === "ArrowRight" && player.x < 470) {
      setPlayer({ ...player, x: player.x + 15 }); // Adjusted player speed
    }
    if (e.key === " ") {
      setBullets([...bullets, { x: player.x + 12, y: player.y }]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player, bullets]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={500} height={500} className="game-canvas"></canvas>
    </div>
  );
};

export default GameCanvas;
