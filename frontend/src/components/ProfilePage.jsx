import React, { useEffect } from 'react';
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  // Get the token from localStorage when component mounts
  const token = localStorage.getItem('token');
  

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
        console.log(response.data)
      } catch (err) {
        alert("Error in fetching profile data")
      }
    };

    // call the fetch profile function if the token exists

    fetchProfile();
  }, [token]);

  
  return (
    <div>
      {token ? (
        <div>
          <h2>Profile Page</h2>
          <p>You are authenticated!</p>
          {/* Your protected content here */}
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