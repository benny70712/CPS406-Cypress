import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleMapComponent from './GoogleMapComponent';
import NavBar from './NavBar.jsx';

const IndexPage = () => {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          name: response.data.name,
          email: response.data.email,
        });

        setLoading(false);
      } catch (err) {
        alert('Error in fetching profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {token ? (
        <>
          <NavBar user={user} onLogout={handleLogout} />
          <main className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
            <p className="mb-6 text-gray-700">Here's your map view:</p>
            <div className="">
              <GoogleMapComponent />
            </div>
          </main>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="mb-6 text-gray-600">Please log in to view this page.</p>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
