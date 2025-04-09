import React, { useState, useEffect } from 'react';
import Navbar from './NavBar.jsx';
import axios from 'axios';

const PoliceView = ({ user, onLogout }) => {
  const [reports, setReports] = useState([]);
  const [statusChangingId, setStatusChangingId] = useState(null); // To track which report is changing
  const token = localStorage.getItem('token');

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };

  // ✅ Function to update report status and send it to backend
  const handleStatusChange = async (reportId, newStatus) => {
    try {
      // Send updated status to backend
      await axios.put(
        `http://localhost:3000/update-status/${reportId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update status in local state (frontend)
      setReports((prevReports) =>
        prevReports.map((r) =>
          r._id === reportId ? { ...r, status: newStatus } : r
        )
      );

      // Close the status change menu
      setStatusChangingId(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // ✅ Fetch reports on component mount
  useEffect(() => {
    const fetchIssuesData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/get-issues', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const reportData = res.data.data.issues;
        setReports(reportData);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    if (token) {
      fetchIssuesData();
    }
  }, [token]);

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All the Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="border-b pb-3 mb-3">
                <h3 className="text-xl font-bold text-gray-800">{report.title}</h3>
                <p className="text-gray-600 mt-1 text-sm">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700">{report.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="ml-2 text-gray-800">{report.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Address:</span>
                  <span className="ml-2 text-gray-800">{report.address || 'N/A'}</span>
                </div>
                <div className="col-span-2 flex items-center mt-2">
                  <span className="font-medium text-gray-600">Status:</span>
                  
                  {statusChangingId === report._id ? (
                    <div className="ml-2 flex space-x-2 flex-wrap">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(report._id, status)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
                        >
                          {status}
                        </button>
                      ))}
                      <button
                        onClick={() => setStatusChangingId(null)}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[report.status] || 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {report.status || 'Pending'}
                      </span>
                      <button
                        onClick={() => setStatusChangingId(report._id)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliceView;
