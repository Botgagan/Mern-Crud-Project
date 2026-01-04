import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLoginBtn from './GoogleLoginBtn';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure backend URL is correct
      const { data } = await axios.post('http://localhost:8000/user/signup', formData);
      
      if (data.Success) {
        alert("Registration Successful!");
        // Note: Usually you redirect to Login after signup, 
        // unless your backend sends a Token here too.
        navigate('/home'); 
      }
    } catch (error) {
      // Use optional chaining to safely access error message
      alert(error.response?.data?.Message || "Registration Failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* LEFT SIDE: Decorative Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-cover bg-center relative" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-12">
          <h1 className="text-4xl font-bold text-white mb-4">Start your journey.</h1>
          <p className="text-lg text-gray-200">Join our community of book lovers and discover your next great read today.</p>
        </div>
      </div>

      {/* RIGHT SIDE: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign in here
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              
              {/* Name Row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </form>

          {/* Google Button Section */}
          <div className="mt-6">
            <GoogleLoginBtn />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;