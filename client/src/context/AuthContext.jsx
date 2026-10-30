import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [founder, setFounder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate existing session on mount
  const checkAuth = useCallback(async () => {
    try {
      const res = await authService.getMe();
      if (res?.success && res.data?.founder) {
        setFounder(res.data.founder);
      } else {
        setFounder(null);
      }
    } catch {
      setFounder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res?.success && res.data?.founder) {
      setFounder(res.data.founder);
      return res.data.founder;
    }
    throw new Error('Unexpected authentication response.');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setFounder(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        founder,
        isAuthenticated: !!founder,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
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

