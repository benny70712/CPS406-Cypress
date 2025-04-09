import React, { useState, useEffect } from 'react';
import Navbar from './NavBar.jsx';
import axios from 'axios';

const PoliceView = ({ user, onLogout }) => {

    const token = localStorage.getItem('token');
  
  
    useEffect(() => {
      const fetchIssuesData = async () => {
  
        try {
          const res = await axios.get('http://localhost:3000/get-issues', {
            headers: { Authorization: `Bearer ${token}` },
          });
  
            
          console.log(res.data)
        } catch (error) {
          console.log("Error in getting Issues Data")
        }
  
  
      };
  
    
      if (token) {
        fetchIssuesData();
      }
    }, [token]);
  return (
    <h1>THis is police view</h1>
  );
};

export default PoliceView;