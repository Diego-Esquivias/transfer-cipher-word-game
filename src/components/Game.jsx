import React, { useState, useEffect } from "react";
import './Game.css'

function Game() {
  const score = 2000
  const cipherText = 'ae-hkewy-'
  const answer = 'hawkeye'
  const key = 213
  const [guess, setGuess] = useState('')
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [deduction, setDeduction] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDeduction(deduction + 10)
      console.log(deduction)
        if(seconds > 0){
            setSeconds(seconds - 1)
        }
        else{
            setSeconds(59)
            setMinutes(minutes - 1)
            if(minutes === 0 && seconds === 0){
                setMinutes(2)
                setSeconds(59)
                return (
                  alert("Time's up! Game over. Your final score was: " + (score - deduction))
                )
            }
        }
    }, 1000)
    return () => clearInterval(timer)
  })

  const handleSubmit = (guess) => {
    if (guess === answer) {
      alert("Correct!")
    } else {
      alert("Incorrect! Try again.")
    }
  
  }


  return (
    <>
        <h1>Level 1</h1>
        {seconds < 10 ? <h1>{minutes+':0'+seconds}</h1> : <h1>{minutes+':'+seconds}</h1>}
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

          <form className="guessBox">
            <input type="text" placeholder="Enter your guess" onChange={(e) => setGuess(e.target.value)} />
            <button onClick={() => handleSubmit(guess)}>Submit</button>
          </form>
        </div>
      </div>
      {/* Need to add a level system and a way to track a player points along
       with an array of cipherText, answer, and keys for each level. */}
    </>
  );
};

export default Game;
