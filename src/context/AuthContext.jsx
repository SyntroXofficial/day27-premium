import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { 
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  logoutUser,
  onAuthStateChange
} from '../services/auth/firebaseAuth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async ({ email, password, username, discordId }) => {
    try {
      const userData = {
        username,
        discordId,
        role: 'member',
        joinDate: new Date().toISOString()
      };

      const { user } = await signUpWithEmailAndPassword(email, password, userData);
      setUser({ ...userData, id: user.uid, email });
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { user } = await loginWithEmailAndPassword(email, password);
      setUser(user);
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signup,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;