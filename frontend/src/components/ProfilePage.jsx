import React, { useState, useEffect } from 'react';
import Navbar from './NavBar.jsx';
import axios from 'axios';

const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({name: '', email: '',});
  const [issues, setIssues] = useState([]);



  useEffect(() => {
    const fetchProfileData = async () => {

      try {
        const res = await axios.get('http://localhost:3000/get-profile-data', {
          headers: { Authorization: `Bearer ${token}` },
        });

          
        setUser(res.data.data.user);    
        setIssues(res.data.data.issues.reverse());
      } catch (error) {
        console.log("Error in getting profile Data")
      }


    };

  
    if (token) {
      fetchProfileData();
    }
  }, [token]);



  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'Ongoing':
        return 'text-yellow-600';
      case 'Not Completed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <h2 className="text-4xl font-bold text-blue-700 mb-6 border-b pb-4">
            Profile Overview
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-lg mb-8">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Your Submitted Reports</h3>

          {issues.length === 0 ? (
            <p className="text-gray-500">You haven’t submitted any reports yet.</p>
          ) : (
            <div className="space-y-6">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200"
                >
                  <h4 className="text-xl font-semibold text-blue-800 mb-2">{issue.title}</h4>
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Description:</span> {issue.description}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Category:</span> {issue.category}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Address:</span> {issue.address}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Status:</span>{' '}
                    <span className={`${getStatusColor(issue.status)} font-medium`}>
                      {issue.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Submitted on: {new Date(issue.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
