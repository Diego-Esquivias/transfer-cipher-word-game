import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import "./Game.css";

function Game() {
  const navigate = useNavigate(); // For navigation
  const initialScore = 2000;
  const initialTime = { minutes: 1, seconds: 59 };
  const levels = [
    { cipherText: "ae-hkewy-", answer: "hawkeye", key: 213 },
    { cipherText: "ieontdnn-", answer: "nintendo", key: 213 },
    { cipherText: "elpmaxe-", answer: "example", key: 213 },
    { cipherText: "edosipe-", answer: "episode", key: 213 },
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [guess, setGuess] = useState("");
  const [time, setTime] = useState(initialTime);
  const [deduction, setDeduction] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [isUsernamePrompt, setIsUsernamePrompt] = useState(false);
  const [username, setUsername] = useState("");
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          alert(`Time's up! Game over. Your final score was: ${score - deduction}`);
          return initialTime;
        }
      });
      setDeduction((prevDeduction) => prevDeduction + 10);
    }, 1000);

    return () => clearInterval(timer);
  }, [score, deduction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { answer } = levels[currentLevel];
    if (guess.toLowerCase() === answer.toLowerCase()) {
      alert("Correct!");
      setScore((prevScore) => prevScore + (time.minutes * 60 + time.seconds) * 10);
      setDeduction(0);
      if (currentLevel < levels.length - 1) {
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setTime(initialTime);
      } else {
        setFinalScore(score - deduction);
        setIsUsernamePrompt(true); // Prompt for username after final level
      }
    } else {
      alert("Incorrect! Try again.");
    }
    setGuess("");
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (/^[a-zA-Z]{2}\d{4}$/.test(username)) {
      try {
        const response = await fetch("http://localhost:5000/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, score: finalScore }),
        });
        if (response.ok) {
          navigate("/leaderboard"); // Redirect to leaderboard page
        } else {
          alert("Failed to submit score. Please try again.");
        }
      } catch (err) {
        alert("Error submitting score: " + err.message);
      }
    } else {
      alert("Username must be 2 letters followed by 4 numbers (e.g., de6283).");
    }
  };

  const formatTime = (minutes, seconds) => {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const { cipherText, key } = levels[currentLevel];

  if (isUsernamePrompt) {
    return (
      <div className="usernamePrompt">
        <h1>Congratulations! You've completed all levels.</h1>
        <h2>Final Score: {finalScore}</h2>
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            placeholder="Enter a username (e.g., de6283)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Submit Username</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1>Level {currentLevel + 1}</h1>
      <h2>Time: {formatTime(time.minutes, time.seconds)}</h2>
      <h2>Score: {score - deduction}</h2>

      <div className="mainContainer">
        <div className="grid">
          <div className="columns">1</div>
          <div className="columns">2</div>
          <div className="columns">3</div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
          <div className="items"></div>
        </div>

        <div className="mainContent">
          <div className="info">
            <h1>CipherText: {cipherText}</h1>
            <h1>Key: {key}</h1>
          </div>

          <form className="guessBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Game;
