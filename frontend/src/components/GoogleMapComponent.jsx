import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 43.65107,
  lng: -79.347015
};



const notifySuccess = (message) => toast.success(message, {
  position: "top-center",
  autoClose: 500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
  });


  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

function GoogleMapReport() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: ''
  });

  const token = localStorage.getItem('token');

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const position = { lat, lng };

    setSelectedPosition(position);
    setFormVisible(true);

    // Reverse geocode to get address
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD-65OSnFKGlxU1gGiNKfYo43SkZf7m6Fo`
      );
      const data = await response.json();

      const formattedAddress = data.results[0]?.formatted_address || 'Unknown address';

      setFormData((prev) => ({
        ...prev,
        address: formattedAddress
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const issue = {
      ...formData,
      location: selectedPosition
    };

    const reportIsuue = async (issue) => {
      try {
        const res = await axios.post(
          'http://localhost:3000/report-issues',
          issue, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        notifySuccess("Report submitted successfully")
        
      } catch (error) {
        notifyError("Error in submitting report")
      }
    }

    reportIsuue(issue)

    console.log('Submitting issue:', issue);

    setFormVisible(true);
    setFormData({
      title: '',
      description: '',
      category: '',
      address: ''
    });
    setSelectedPosition(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container with border */}
        <div className="w-full lg:w-1/2">
          <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 h-full">
            <LoadScript googleMapsApiKey="AIzaSyD-65OSnFKGlxU1gGiNKfYo43SkZf7m6Fo">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={defaultCenter}
                zoom={13}
                onClick={handleMapClick}
              >
                {selectedPosition && <Marker position={selectedPosition} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
  
        {/* Form Container */}
        <div className="w-full lg:w-1/2">
          {formVisible && (
            <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white p-6 h-full">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Report an Issue</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Issue Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded h-32"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  <option value="Violent Crimes">Violent Crimes</option>
                  <option value="Property Crimes">Property Crimes</option>
                  <option value="White-Collar Crimes">White-Collar Crimes</option>
                  <option value="Organized Crimes">Organized Crimes</option>
                  <option value="Victimless or Consensual Crimes">Victimless or Consensual Crimes</option>
                </select>
  
                {formData.address && (
                  <p className="text-gray-600">
                    <strong>Address:</strong> {formData.address}
                  </p>
                )}
  
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit Report
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </div>
  );
}

export default GoogleMapReport;