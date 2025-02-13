import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGamepad, FaPlay, FaRandom, FaExclamationTriangle, FaSignInAlt, 
  FaStar, FaCalendar, FaUsers, FaUserCheck, FaFilm, 
  FaTv, FaBolt, FaCrown, FaRocket, FaCircle, FaClock, FaGlobe,
  FaInfoCircle, FaUserShield
} from 'react-icons/fa';
import { auth, db } from '../supabase';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

function Home() {
  const user = auth.currentUser;
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalGames: 0,
    totalMovies: 1000,
    totalShows: 500,
    dailyLogins: 0,
    staff: 1
  });
  const [activeUsers, setActiveUsers] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [games, setGames] = useState([]);
  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dbSetupNeeded, setDbSetupNeeded] = useState(false);

  useEffect(() => {
    const checkDbSetup = async () => {
      try {
        const promises = [
          db.from('users').select('count', { count: 'exact', head: true }),
          db.from('games').select('count', { count: 'exact', head: true }),
          db.from('generators').select('count', { count: 'exact', head: true })
        ];

        const results = await Promise.all(promises);
        const hasError = results.some(result => result.error?.message?.includes('does not exist'));
        
        if (hasError) {
          setDbSetupNeeded(true);
          setLoading(false);
          return;
        }

        // If tables exist, proceed with data fetching
        fetchData();
      } catch (error) {
        console.error('Error checking database setup:', error);
        setDbSetupNeeded(true);
        setLoading(false);
      }
    };

    checkDbSetup();
  }, []);

  const fetchData = async () => {
    try {
      // Initialize default stats
      const defaultStats = {
        totalUsers: 0,
        activeUsers: 0,
        totalGames: 0,
        totalMovies: 1000,
        totalShows: 500,
        dailyLogins: 0,
        staff: 1
      };

      let stats = { ...defaultStats };

      try {
        const { data: usersData, error: usersError } = await db
          .from('users')
          .select('*');

        if (!usersError) {
          stats.totalUsers = usersData.length;
          
          const now = new Date();
          const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
          
          stats.activeUsers = usersData.filter(user => {
            const lastActive = new Date(user.last_active);
            return lastActive >= oneDayAgo;
          }).length;

          stats.dailyLogins = usersData.filter(user => {
            const lastLogin = new Date(user.last_login);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return lastLogin >= today;
          }).length;
        }
      } catch (error) {
        console.log('Users table not ready:', error);
      }

      setStats(stats);

      // Fetch latest content
      try {
        const { data: gamesData, error: gamesError } = await db
          .from('games')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (!gamesError) {
          setGames(gamesData);
          stats.totalGames = gamesData.length;
        }
      } catch (error) {
        console.log('Games table not ready:', error);
        setGames([]);
      }

      try {
        const { data: generatorsData, error: generatorsError } = await db
          .from('generators')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (!generatorsError) {
          setGenerators(generatorsData);
        }
      } catch (error) {
        console.log('Generators table not ready:', error);
        setGenerators([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load content');
      setLoading(false);
    }
  };

  const formatLastActive = (lastActive) => {
    if (!lastActive || !lastActive.toDate) return 'Never';
    try {
      const lastActiveDate = lastActive.toDate();
      return lastActiveDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown';
    }
  };

  const isUserOnline = (lastActive) => {
    if (!lastActive || !lastActive.toDate) return false;
    try {
      const lastActiveDate = lastActive.toDate();
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return lastActiveDate > twentyFourHoursAgo;
    } catch (error) {
      console.error('Error checking online status:', error);
      return false;
    }
  };

  if (dbSetupNeeded) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Database Setup Required</h2>
          <p className="mb-4">The application requires some database tables to be created. Please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Go to your Supabase dashboard</li>
            <li>Navigate to the SQL editor</li>
            <li>Copy and run the following SQL commands:</li>
          </ol>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid references auth.users on delete cascade,
  email text,
  last_active timestamp with time zone,
  last_login timestamp with time zone,
  profile_pic_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Games table
create table public.games (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Generators table
create table public.generators (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.games enable row level security;
alter table public.generators enable row level security;

-- Create policies
create policy "Users can view all users"
  on public.users for select
  to authenticated
  using (true);

create policy "Users can update their own data"
  on public.users for update
  to authenticated
  using (auth.uid() = id);

create policy "Anyone can view games"
  on public.games for select
  to anon, authenticated
  using (true);

create policy "Anyone can view generators"
  on public.generators for select
  to anon, authenticated
  using (true);`}
          </pre>
          <p className="text-yellow-400">After running these commands, refresh this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div 
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img 
              src="https://media.discordapp.net/attachments/1193190985614757969/1338522256426537005/Screenshot_1289.png?ex=67ab637e&is=67aa11fe&hm=32cf92f0ec3b22242ff7a19fe2e0e3246cf6ec1e7fc8b0f8351f750c8bd95c31&=&format=webp&quality=lossless&width=2605&height=1327"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold mb-6">
              Your Gateway to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Premium Digital Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Experience unlimited access to premium games, streaming services, and exclusive content. 
              Join our growing community and unlock a world of digital entertainment.
            </p>

            {/* Main Action Buttons */}
            {!user && (
              <div className="flex justify-center gap-6 mb-12">
                <Link 
                  to="/login" 
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg group"
                >
                  Sign In
                  <FaSignInAlt className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold text-lg border border-white/20 group"
                >
                  Create Account
                  <FaRocket className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Access Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mb-16"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Link to={user ? "/streaming" : "/login"} className="group">
              <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 backdrop-blur-sm rounded-xl p-8 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-red-600 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaPlay className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Streaming</h3>
                    <p className="text-gray-300">Watch in 4K Ultra HD</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={user ? "/games" : "/login"} className="group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-white to-gray-200 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaGamepad className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Games</h3>
                    <p className="text-gray-300">Premium Game Access</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={user ? "/generator" : "/login"} className="group">
              <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 backdrop-blur-sm rounded-xl p-8 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-red-600 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaRandom className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Generator</h3>
                    <p className="text-gray-300">Premium Services</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mb-16"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 backdrop-blur-sm rounded-xl p-8 border border-red-500/10">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-red-600/20 rounded-lg">
                  <FaUsers className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-gray-300">Total Members</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-center space-x-4">
                {adminUser?.profilePicUrl ? (
                  <img 
                    src={adminUser.profilePicUrl}
                    alt="Admin"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="p-4 bg-white/10 rounded-lg">
                    <FaUserShield className="w-8 h-8 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold text-white">andres_rios</p>
                  <p className="text-gray-300">Administrator</p>
                </div>
              </div>
            </div>

            <Link to="/important" className="group">
              <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 backdrop-blur-sm rounded-xl p-8 border border-red-500/10 hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-red-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaExclamationTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-500">Important</p>
                    <p className="text-red-400">Information</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Active Members Section */}
          <motion.div 
            className="bg-gradient-to-br from-red-600/5 to-black backdrop-blur-sm rounded-xl border border-red-500/10 p-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <FaUsers className="mr-3 text-red-500" />
                Active Members ({activeUsers.length})
              </h2>
            </div>
            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
              {activeUsers.map(member => (
                <div key={member.id} className="flex items-center justify-between bg-black/40 p-4 rounded-lg border border-red-500/10">
                  <div className="flex items-center space-x-4">
                    {member.profilePicUrl ? (
                      <img 
                        src={member.profilePicUrl}
                        alt={member.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <FaUserCheck className="w-6 h-6 text-red-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{member.username}</p>
                      <p className="text-sm text-gray-400">#{member.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCircle className={`w-2 h-2 ${isUserOnline(member.lastActive) ? 'text-red-500' : 'text-gray-500'}`} />
                    <div className="text-sm text-gray-400">
                      {isUserOnline(member.lastActive) ? (
                        <span className="text-red-400">Active at {formatLastActive(member.lastActive)}</span>
                      ) : (
                        <span>Last seen {formatLastActive(member.lastActive)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;