import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('adminInfo');
    if (userInfo) {
      setAdmin(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      );

      setAdmin(data);
      localStorage.setItem('adminInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
