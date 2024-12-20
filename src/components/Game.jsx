import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import "./Game.css";

function Game() {
  const navigate = useNavigate(); // For navigation
  const initialScore = 2000;
  const initialTime = { minutes: 2, seconds: 59 };

  // Predefined levels with scrambled words and answers
  const levels = [
    [
      { answer: "NINTENDO", key: "123", cipherText: "NTDIEONN-" },
      { answer: "PYRAMID", key: "213", cipherText: "YM-PADRI-" },
      { answer: "MOUNTAIN", key: "312", cipherText: "UA-MNIOTN" }
    ],
    [
      { answer: "CATERPILLAR", key: "1234", cipherText: "CRLAPATIREL-" },
      { answer: "HEADQUARTER", key: "2341", cipherText: "EUEAARDR-HQT" },
      { answer: "BUTTERFLIES", key: "3412", cipherText: "TFSTL-BEIURE" }
    ],
    [
      { answer: "TRANSATLANTIC", key: "12345", cipherText: "TATRTIALCNA-SN-" },
      { answer: "CLASSIFICATION", key: "21345", cipherText: "LFICITAIOSCNSA-" },
      { answer: "PHOTOGRAPHY", key: "34125", cipherText: "OA-TP-PGYHR-OH-" }
    ],
    [
      { answer: "INTERCONTINENTAL", key: "123456", cipherText: "IONNNTTTAEILRN-CE-" },
      { answer: "MICROSCOPICALLY", key: "654321", cipherText: "SA-OC-RI-CPYIOLMCL" },
      { answer: "CONSTRUCTIONISM", key: "341265", cipherText: "NTMSI-CUIOCSRN-TO-" }
    ]
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track which word is being guessed
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
          navigate("/"); // Navigate to the start menu when time runs out
          return initialTime;
        }
      });
      setDeduction((prevDeduction) => prevDeduction + 10);
    }, 1000);

    return () => clearInterval(timer);
  }, [score, deduction, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentLevelWords = levels[currentLevel];
    const { answer } = currentLevelWords[currentWordIndex];
    
    // Check if the current guess is correct
    if (guess.toLowerCase() === answer.toLowerCase()) {
      alert("Correct!");
      setScore((prevScore) => prevScore + (time.minutes * 60 + time.seconds) * 10);
      setDeduction(0);

      if (currentWordIndex < 2) {
        // If there are more words to guess in this level, move to the next word
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      } else {
        // All words guessed correctly, move to next level
        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prevLevel) => prevLevel + 1);
          setCurrentWordIndex(0); // Reset word index for next level
        } else {
          // Game finished, prompt for username
          setFinalScore(score - deduction);
          setIsUsernamePrompt(true);
        }
      }
    } else {
      alert("Incorrect! Try again.");
    }

    setGuess(""); // Reset the guess after each submission
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

  // Get the current level's words
  const currentLevelWords = levels[currentLevel];

  // Grid columns will increase with each level
  const columnsCount = 3 + currentLevel; // Start with 3 columns, adding 1 for each level

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
      <div className="topBar">
        <button className="quitButton" onClick={() => navigate("/")}>Quit</button>
        <div className="rightButtons">
          <button onClick={() => navigate("/rules")}>Rules</button>
          <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        </div>
      </div>

      <div className="level">
        <h1>Level {currentLevel + 1}</h1>
      </div>

      <div className="time">
        <h2>Time: {formatTime(time.minutes, time.seconds)}</h2>
      </div>

      <div className="score">
        <h2>Score: {score - deduction}</h2>
      </div>

      <div className="mainContainer">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}>
          {[...Array(columnsCount)].map((_, index) => (
            <div key={`column-${index}`} className="columns">
              {index + 1}
            </div>
          ))}
          {[...Array(columnsCount * 3)].map((_, index) => (
            <div key={`item-${index}`} className="items"></div>
          ))}
        </div>

        <div className="mainContent">
          <div className="info">
            <h1>CipherText: {currentLevelWords[currentWordIndex].cipherText}</h1>
            <h1>Key: {currentLevelWords[currentWordIndex].key}</h1>
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
