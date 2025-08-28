
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('userToken');

      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        setUser(response.data);
      } catch (err) {

        console.error("Failed to fetch user:", err);
        setError(err.message);
        localStorage.removeItem('userToken');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(() => ({
    user,
    isLoading,
    error,
  }), [user, isLoading, error]);
  console.log(user);
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}