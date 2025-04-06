import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
  
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
  
      if (response.status === 200) {
        const message = `Success: ${response.data.success}\nMessage: ${response.data.message}\nData: ${JSON.stringify(response.data.data)}`;
        alert(message);
        console.log(response.data);
      } 
  
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error response safely
      const message = error.response?.data?.message || "Login failed. Please try again.";
      alert(`Error: ${message}`);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
