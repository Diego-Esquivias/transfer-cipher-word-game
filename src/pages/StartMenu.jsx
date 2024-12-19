import React from 'react';
import Rules from './Rules';
import Leaderboard from '../components/Leaderboard';
import Game from '../components/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './background.css'
import './StartMenu.css'

const StartMenu = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define all the routes */}
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
};

// Main Menu Component (only displays links)
const MainMenu = () => {
  return (
    <div className='menu'>
      <h1>Neon Decrypt</h1>
      <div className="btn"><a href="/game">Begin</a></div>
      <div className="btn"><a href="/rules">Rules</a></div>
      <div className="btn"><a href="/leaderboard">Leaderboard</a></div>
    </div>
  );
};

export default StartMenu;
