import React from 'react';

const ReportForm = ({
  formData,
  onChange,
  onSubmit,
  position,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '20px',
        background: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        zIndex: 1000,
        width: '300px',
        borderRadius: '10px'
      }}
    >
      <h3 className="text-lg font-bold mb-2">Report an Issue</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={formData.title}
          onChange={onChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select Category</option>
          <option value="Pothole">Pothole</option>
          <option value="Broken Light">Broken Light</option>
          <option value="Graffiti">Graffiti</option>
        </select>

        {formData.address && (
          <p className="text-sm text-gray-500 mb-2">
            <strong>Address:</strong> {formData.address}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
