import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Library from './pages/Library';
import GameDetails from './pages/GameDetails';
import Streaming from './pages/Streaming';
import Warning from './pages/Warning';
import Methods from './pages/Methods';
import Accounts from './pages/Accounts';
import AccountDetails from './pages/AccountDetails';
import FAQ from './pages/FAQ';
import XboxGamePass from './pages/methods/XboxGamePass';
import SteamFamily from './pages/methods/SteamFamily';
import EpicGames from './pages/methods/EpicGames';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:gameId" element={<GameDetails />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/warning" element={<Warning />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/methods/xbox-gamepass" element={<XboxGamePass />} />
          <Route path="/methods/steam-family" element={<SteamFamily />} />
          <Route path="/methods/epic-games" element={<EpicGames />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:accountId" element={<AccountDetails />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
