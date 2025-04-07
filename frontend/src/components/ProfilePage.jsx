import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import GoogleMapComponent from './GoogleMapComponent';

const ProfilePage = () => {
  // Get the token from localStorage when component mounts
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

// this is the google map api key
//   AIzaSyD-65OSnFKGlxU1gGiNKfYo43SkZf7m6Fo


  

  useEffect(() => {
   
    if (!token) {
        setLoading(false);
        return;
    } ;

    // async function for fetching the user profile data 
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser({
            name: response.data.name,
            email: response.data.email
          });

        setLoading(false)

      } catch (err) {
        alert("Error in fetching profile data")
      }
    };

    // call the fetch profile function if the token exists

    fetchProfile();
  }, [token]);


  const handleLogout = () => {
    // 1. Remove token from localStorage
    localStorage.removeItem('token');
    
    // 2. Redirect to login page
    navigate('/login');
    
    // 3. Optional: Refresh state by reloading
    window.location.reload();
  };


  if (loading) {
    return <div>Loading...</div>
  }

  
  return (
    <div>
      {token ? (
        <div>
          <h2>Profile Page</h2>
          <p>You are authenticated!</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <GoogleMapComponent />
        </div>
      ) : (
        <div>
          <h2>Access Denied</h2>
          <p>Please log in to view this page.</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          
        </div>
      )}
    </div>
  );
};

export default ProfilePage;