import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data from the backend
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/scores'); // Adjust the URL to match your backend route
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data); // Assuming the backend returns an array of top 10 scores
        } else {
          console.error('Failed to fetch leaderboard data.');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <div className="titles">
        <h1>Rank</h1>
        <h1>User</h1>
        <h1>Score</h1>
      </div>

      <div className="leaderboard-rows">
        {leaderboard.map((entry, index) => (
          <div className="leaderboard-row" key={index}>
            <h2>{index + 1}</h2>
            <h2>{entry.username}</h2>
            <h2>{entry.score}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
