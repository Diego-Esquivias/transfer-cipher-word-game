import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/scores');
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data);
        } else {
          console.error('Failed to fetch leaderboard data.');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleGoBack = () => {
    navigate('/game'); // Navigate to the game page
  };

  return (
    <>
      <div className="leaderTitle">
        <h1>Leaderboard</h1>
      </div>

      <div className="leaderboard">
        <div className="titles">
          <h1>Rank</h1>
          <h1>User</h1>
          <h1>Score</h1>
        </div>

        <div className="leaderboard-rows">
          {leaderboard.map((entry, index) => (
            <div className="leaderboard-row" key={index}>
              <div className='userRank'>
                <h2 className={`${index < 3 ? `rank-${index + 1}` : 'default-rank'}`}>
                  {index + 1}
                </h2>
              </div>
              <div className="userInfo">
                <div>
                  <h2 className="userName">{entry.username}</h2>
                </div>
                <div>
                  <h2 className="userScore">{entry.score}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <button onClick={handleGoBack} className="goBackButton">
          Go Back to Game
        </button>
    </>
  );
};

export default Leaderboard;
