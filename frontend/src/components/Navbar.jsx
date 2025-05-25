import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../helper/AxiosInstance';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      await axios.get('http://localhost:8000/api/v1/user/me', { withCredentials: true });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    await axios.get('http://localhost:8000/api/v1/user/logout', {}, { withCredentials: true });
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">LogiShip</Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
