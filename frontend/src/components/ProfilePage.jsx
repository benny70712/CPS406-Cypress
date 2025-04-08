import React, { useEffect, useState } from 'react';
import Navbar from './NavBar.jsx';
import axios from 'axios';

const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.name, email: res.data.email });
      } catch (err) {
        alert('Failed to load profile data');
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
          <h2 className="text-3xl font-extrabold text-blue-600 mb-6 border-b pb-2">
            Profile Page
          </h2>
  
          <div className="space-y-4 text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default ProfilePage;
