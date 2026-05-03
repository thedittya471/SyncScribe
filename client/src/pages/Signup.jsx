import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // TODO: Add signup logic
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row font-sans bg-white overflow-hidden">
        
        {/* Left Panel */}
        <AuthLeftPanel />

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[55%] p-8 sm:p-12 xl:p-24 flex flex-col justify-center h-screen overflow-y-auto">
          <div className="w-full max-w-[480px] mx-auto lg:ml-12 xl:ml-20 my-auto">
            <h2 className="text-[3rem] xl:text-[3.5rem] font-extrabold text-[#2C3647] mb-10">Sign Up</h2>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="w-full bg-white rounded-2xl p-3 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-xs xl:text-sm font-bold text-[#64748B] mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your Full Name" 
                  className="w-full text-base outline-none placeholder-gray-300 font-medium text-[#2C3647] bg-transparent"
                />
              </div>

              <div className="w-full bg-white rounded-2xl p-3 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-xs xl:text-sm font-bold text-[#64748B] mb-1">
                  Username
                </label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your Username" 
                  className="w-full text-base outline-none placeholder-gray-300 font-medium text-[#2C3647] bg-transparent"
                />
              </div>

              <div className="w-full bg-white rounded-2xl p-3 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-xs xl:text-sm font-bold text-[#64748B] mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email" 
                  className="w-full text-base outline-none placeholder-gray-300 font-medium text-[#2C3647] bg-transparent"
                />
              </div>

              <div className="w-full bg-white rounded-2xl p-3 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-xs xl:text-sm font-bold text-[#64748B] mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password" 
                  className="w-full text-base outline-none placeholder-gray-300 font-medium text-[#2C3647] bg-transparent"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#FA7275] hover:bg-[#F95F63] text-white text-lg font-bold py-4 xl:py-5 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(250,114,117,0.25)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.4)] hover:-translate-y-1 mt-6"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-10 text-sm font-medium text-[#64748B]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FA7275] hover:text-[#F95F63] font-bold transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Signup;
