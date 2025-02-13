import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import { auth, db } from '../supabase';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Check if username already exists
      const { data: existingUsers, error: queryError } = await db
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (queryError && queryError.code !== 'PGRST116') {
        throw queryError;
      }

      if (existingUsers) {
        setError('Username already exists');
        setLoading(false);
        return;
      }

      // Create user
      const { data: authData, error: signUpError } = await auth.signUp(email, password);
      if (signUpError) throw signUpError;

      // Create user profile
      const { error: insertError } = await db
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: email,
            username: username,
            created_at: new Date().toISOString(),
            role: 'user',
            status: 'active'
          }
        ]);

      if (insertError) throw insertError;

      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <h3 className="text-red-500 font-semibold mb-2 flex items-center">
              <FaExclamationTriangle className="mr-2" />
              Important Notice
            </h3>
            <p className="text-red-400 text-sm">
              Only one account per IP address is allowed. Make sure you're using either Gmail, Proton, or Outlook email.
              Providing incorrect information will result in an immediate permanent ban.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white text-sm font-medium block mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 text-white border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-white/40"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 text-white border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-white/40"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <p className="mt-1 text-gray-400 text-xs">Only Gmail, Proton, or Outlook emails allowed</p>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 text-white border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-white/40"
                  placeholder="Choose a password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/50 text-white border border-white/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-white/40"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3">
                <FaExclamationTriangle className="text-red-500 mt-0.5" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-white text-black rounded-lg py-3 font-semibold transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
            >
              {loading ? 'Loading...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
