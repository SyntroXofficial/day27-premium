import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Steam from './components/Steam';
import Methods from './components/Methods';
import Accounts from './components/Accounts';
import OtherServices from './components/OtherServices';
import WeeklyMissions from './components/WeeklyMissions';
import Library from './components/Library';
import Streaming from './components/Streaming';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/library" element={<Library />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/steam" element={<Steam />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/other-services" element={<OtherServices />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/missions" element={<WeeklyMissions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
