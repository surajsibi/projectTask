import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import axisoInstance from '../helper/AxiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role, _id }
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axisoInstance.get('http://localhost:8000/api/v1/user/me', { withCredentials: true });
      // console.log(res)
      setUser(res.data.data);
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
