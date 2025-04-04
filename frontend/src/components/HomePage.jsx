import React from 'react'

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4" id="main-title">
          Welcome to Tailwind!
        </h1>
        <p className="text-gray-700 mb-6">
          If you're seeing this styled correctly, Tailwind is working 🎉
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          id="test-button"
        >
          Click Me
        </button>
      </div>
    </div>
  )
}

export default HomePage
