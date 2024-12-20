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
      <a href="/game"><div className="btn">Begin</div></a>
      <a href="/rules"><div className="btn">Rules</div></a>
      <a href="/leaderboard"><div className="btn">Leaderboard</div></a>
    </div>
  );
};

export default StartMenu;
