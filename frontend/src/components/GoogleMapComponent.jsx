import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 43.65107,
  lng: -79.347015
};

function GoogleMapReport() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });
    setFormVisible(true); // Show form after click
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

    // For now just log it. You can send this to your Express backend.
    console.log('Submitting issue:', issue);

    // Reset
    setFormVisible(false);
    setFormData({ title: '', description: '', category: '' });
    setSelectedPosition(null);
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyD-65OSnFKGlxU1gGiNKfYo43SkZf7m6Fo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </LoadScript>

      {formVisible && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          background: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          zIndex: 1000,
          width: '300px',
          borderRadius: '10px'
        }}>
          <h3>Report an Issue</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Issue Title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            >
              <option value="">Select Category</option>
              <option value="Pothole">Pothole</option>
              <option value="Broken Light">Broken Light</option>
              <option value="Graffiti">Graffiti</option>
            </select>
            <button type="submit">Submit Report</button>
          </form>
        </div>
      )}
    </>
  );
}

export default GoogleMapReport;
