import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

const DEFAULT_FOUNDER = {
  id: 'founder_1_govind',
  name: 'Govind Rathod',
  email: 'hello.websmagic@gmail.com',
  role: 'founder',
};

export const AuthProvider = ({ children }) => {
  const [founder, setFounder] = useState(DEFAULT_FOUNDER);
  const [loading, setLoading] = useState(false);

  // Validate existing session on mount in background
  const checkAuth = useCallback(async () => {
    try {
      const res = await authService.getMe();
      if (res?.success && res.data?.founder) {
        setFounder(res.data.founder);
      }
    } catch {
      // Keep default founder session
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

