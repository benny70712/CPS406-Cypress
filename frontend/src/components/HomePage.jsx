import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const notify = () =>
    toast.success('🦄 Wow so easy!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
          Cypress Form Report System
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Use this platform to report important issues directly to authorities by submitting a form with your current location on the map.
        </p>

        <p className="text-gray-500 text-sm mb-8">
          Your report helps maintain safety and transparency in the community.
          Please ensure your location data is accurate.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Register
          </a>
        </div>

        <button
          onClick={notify}
          className="mt-4 text-sm text-blue-500 underline hover:text-blue-700 transition"
        >
          Show Demo Toast
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default HomePage;
