import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Streaming from './pages/Streaming';
import Movie from './pages/Movie';
import TVShow from './pages/TVShow';
import Search from './pages/Search';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Generator from './pages/Generator';
import GeneratorDetails from './pages/GeneratorDetails';
import Important from './pages/Important';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminGames from './pages/AdminGames';
import AdminGenerator from './pages/AdminGenerator';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import PageTransition from './components/PageTransition';
import TransitionLayout from './components/TransitionLayout';
import { supabase } from './supabase';
import { FaExclamationTriangle, FaYoutube } from 'react-icons/fa';

function PrivateRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  const isAdmin = user?.email === 'andres_rios_xyz@outlook.com';

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

// Critical Info Button Component
function CriticalInfoButton() {
  const location = useLocation();
  const isImportantPage = location.pathname === '/important';

  if (isImportantPage) return null;

  return (
    <Link
      to="/important"
      className="fixed top-20 right-4 z-50 flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-300 group text-sm"
    >
      <FaExclamationTriangle className="group-hover:rotate-12 transition-transform duration-300" />
      <span className="ml-2">CRITICAL</span>
    </Link>
  );
}

// YouTube Button Component
function YouTubeButton() {
  const location = useLocation();
  const isYoutubePage = location.pathname === '/youtube';

  if (isYoutubePage) return null;

  return (
    <Link
      to="https://www.youtube.com/@olade_official"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-32 right-4 z-50 flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all duration-300 group text-sm"
    >
      <FaYoutube className="group-hover:scale-110 transition-transform duration-300" />
      <span className="ml-2">YOUTUBE</span>
    </Link>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen bg-black transition-all duration-300 ${isSidebarOpen ? 'pl-16' : ''}`}>
        <main className="relative">
          <AnimatedRoutes />
          <CriticalInfoButton />
          <YouTubeButton />
        </main>
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <TransitionLayout key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/signup" element={
            <PageTransition>
              <Signup />
            </PageTransition>
          } />
          <Route path="/streaming" element={
            <PageTransition>
              <PrivateRoute>
                <Streaming />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/games" element={
            <PageTransition>
              <PrivateRoute>
                <Games />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/game/:id" element={
            <PageTransition>
              <PrivateRoute>
                <GameDetails />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/generator" element={
            <PageTransition>
              <PrivateRoute>
                <Generator />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/generator/:id" element={
            <PageTransition>
              <PrivateRoute>
                <GeneratorDetails />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/important" element={
            <PageTransition>
              <Important />
            </PageTransition>
          } />
          <Route path="/movie/:id" element={
            <PageTransition>
              <PrivateRoute>
                <Movie />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/tv/:id" element={
            <PageTransition>
              <PrivateRoute>
                <TVShow />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/search" element={
            <PageTransition>
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            </PageTransition>
          } />
          <Route path="/admin" element={
            <PageTransition>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </PageTransition>
          } />
          <Route path="/admin/games" element={
            <PageTransition>
              <AdminRoute>
                <AdminGames />
              </AdminRoute>
            </PageTransition>
          } />
          <Route path="/admin/generator" element={
            <PageTransition>
              <AdminRoute>
                <AdminGenerator />
              </AdminRoute>
            </PageTransition>
          } />
          <Route path="/admin/users" element={
            <PageTransition>
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            </PageTransition>
          } />
          <Route path="/admin/analytics" element={
            <PageTransition>
              <AdminRoute>
                <AdminAnalytics />
              </AdminRoute>
            </PageTransition>
          } />
          <Route path="/admin/reports" element={
            <PageTransition>
              <AdminRoute>
                <AdminReports />
              </AdminRoute>
            </PageTransition>
          } />
        </Routes>
      </TransitionLayout>
    </AnimatePresence>
  );
}

export default App;
