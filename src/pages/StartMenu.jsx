import React from 'react'
import Rules from './Rules';
import Leaderboard from '../components/Leaderboard';
import Game from '../components/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const StartMenu = () => {
  return (
    <>
    <div>
        <h1>Neon Decrypt</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/game" element={<Game />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
        <div className="btn"><a href="/game">Begin</a></div>
        <div className="btn"><a href="/rules">Rules</a></div>
        <div className="btn"><a href="/leaderboard">Leaderboard</a></div>
    </div>
    </>
  )
}

export default StartMenu