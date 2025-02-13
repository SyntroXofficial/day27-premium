import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, FaPlay, FaGamepad, FaRandom,
  FaUserShield, FaComments, FaSignInAlt, FaUser,
  FaBars, FaTimes, FaChevronRight, FaExclamationTriangle
} from 'react-icons/fa';
import { supabase } from '../supabase';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDoc, setUserDoc] = useState(null);
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === 'andres_rios_xyz@outlook.com';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getInitialUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const fetchUserData = async () => {
      if (!user) {
        setUserDoc(null);
        return;
      }

      try {
        // Initial delay to allow trigger to work
        if (retryCount === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // First, check if user exists by username
        const { data: existingUser, error: searchError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (searchError) {
          console.error('Error searching for user:', searchError);
          return;
        }

        // If user doesn't exist, create it
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                email: user.email,
                username: user.email.split('@')[0],
                display_name: user.email.split('@')[0],
                last_login: new Date().toISOString(),
                last_active: new Date().toISOString()
              }
            ]);

          if (insertError) {
            console.error('Error creating user:', insertError);
            return;
          }

          // Wait a bit for the insert to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Now fetch the user data
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('id, email, username, display_name, profile_pic_url, last_login, last_active, created_at')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retry attempt ${retryCount} of ${maxRetries}...`);
            setTimeout(fetchUserData, 2000);
            return;
          }
          console.error('Error fetching user data:', fetchError);
          return;
        }

        if (userData) {
          setUserDoc(userData);
          // Update last_active
          const { error: updateError } = await supabase
            .from('users')
            .update({ last_active: new Date().toISOString() })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating last_active:', updateError);
          }
        }
      } catch (error) {
        console.error('Error in user data flow:', error);
      }
    };

    if (user) {
      fetchUserData();
    }

    return () => {
      retryCount = maxRetries; // Stop any pending retries
    };
  }, [user]);

  const handleSignOut = async () => {
    try {
      // Update last_active before signing out
      if (user) {
        await supabase
          .from('users')
          .update({ last_active: new Date().toISOString() })
          .eq('id', user.id);
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUserDoc(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          profile_pic_url: profileUrl,
          last_active: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return;
      }
      
      setShowProfileModal(false);
      setProfileUrl('');
      
      // Refresh user data
      const { data: refreshedData, error: refreshError } = await supabase
        .from('users')
        .select('id, email, username, display_name, profile_pic_url, last_login, last_active, created_at')
        .eq('id', user.id)
        .single();

      if (refreshError) {
        console.error('Error fetching updated user data:', refreshError);
        return;
      }

      if (refreshedData) {
        setUserDoc(refreshedData);
      }
    } catch (error) {
      console.error('Error in profile update flow:', error);
    }
  };

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    ...(user ? [
      { path: '/streaming', icon: FaPlay, label: 'Streaming' },
      { path: '/games', icon: FaGamepad, label: 'Games' },
      { path: '/generator', icon: FaRandom, label: 'Generator' },
      { path: '/important', icon: FaExclamationTriangle, label: 'Important', highlight: true },
    ] : []),
    ...(isAdmin ? [{ path: '/admin', icon: FaUserShield, label: 'Admin' }] : [])
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://media.discordapp.net/attachments/1193190985614757969/1338521290499424308/Screenshot_1705.png?ex=67ab6298&is=67aa1118&hm=4016cd9a9b75badd9b65226cd2064a494302298ec1402dade04eadb053bb62bd&=&format=webp&quality=lossless&width=780&height=739"
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white font-bold text-xl">OLADE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-white text-black'
                      : item.highlight
                      ? 'text-red-500 hover:bg-red-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  } flex items-center space-x-2`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    {userDoc?.profile_pic_url ? (
                      <img
                        src={userDoc.profile_pic_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden">
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-medium truncate">{user.email}</p>
                        <p className="text-gray-400 text-sm">Logged in</p>
                      </div>
                      <button
                        onClick={() => setShowProfileModal(true)}
                        className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center"
                      >
                        <FaUser className="w-4 h-4 mr-2" />
                        Update Profile Picture
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center"
                      >
                        <FaSignInAlt className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}

                  {/* Profile Picture Modal */}
                  {showProfileModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-[#1A1A1B] p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Update Profile Picture</h3>
                        <input
                          type="url"
                          value={profileUrl}
                          onChange={(e) => setProfileUrl(e.target.value)}
                          placeholder="Enter image URL"
                          className="w-full bg-black/50 text-white px-4 py-2 rounded-lg border border-white/20 mb-4"
                        />
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setShowProfileModal(false)}
                            className="px-4 py-2 text-white/70 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateProfile}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <FaSignInAlt className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
              >
                {isOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-md z-40 md:hidden border-l border-white/10"
      >
        <div className="p-4 space-y-4">
          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-white text-black'
                  : item.highlight
                  ? 'text-red-500 hover:bg-red-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              <FaChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          ))}

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute bottom-8 left-4 right-4 flex items-center justify-center space-x-2 bg-white text-black px-4 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            <FaTimes className="w-4 h-4" />
            <span>Close Menu</span>
          </button>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}

export default Navbar;