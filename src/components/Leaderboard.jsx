import React from 'react'
import './Leaderboard.css'

const Leaderboard = () => {
  return (
    <>
    <div className="leaderboard">
        <div className="titles">
            <h1>Rank</h1>
            <h1>User</h1>
            <h1>Score</h1>
        </div>

        <div className="leaderboard-rows">
            <div className="leaderboard-row">
                <h2>1</h2>
                <h2>User1</h2>
                <h2>100</h2>
            </div>
            <div className="leaderboard-row">
                <h2>2</h2>
                <h2>User2</h2>
                <h2>80</h2>
            </div>
            <div className="leaderboard-row">
                <h2>3</h2>
                <h2>User3</h2>
                <h2>70</h2>
            </div>
        </div>
    </div>
    </>
  )
}

export default Leaderboard