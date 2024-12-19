import React, { useState, useEffect } from "react";
import './Game.css';

function Game() {
  const initialScore = 2000;
  const initialTime = { minutes: 1, seconds: 59 };
  const levels = [
    { cipherText: 'ae-hkewy-', answer: 'hawkeye', key: 213 },
    { cipherText: 'ieontdnn-', answer: 'nintendo', key: 213 }
    // Add more levels here
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [guess, setGuess] = useState('');
  const [time, setTime] = useState(initialTime);
  const [deduction, setDeduction] = useState(0);
  const [score, setScore] = useState(initialScore);

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
        alert(`Congratulations! You completed all levels. Final Score: ${score}`);
      }
    } else {
      alert("Incorrect! Try again.");
    }
  };

  const formatTime = (minutes, seconds) => {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const { cipherText, key } = levels[currentLevel];

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

      {/* Add level system and tracking */}
    </>
  );
}

export default Game;
