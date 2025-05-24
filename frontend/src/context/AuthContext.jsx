import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import axisoInstance from '../helper/AxiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role, _id }
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axisoInstance.get('/user/me', { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
