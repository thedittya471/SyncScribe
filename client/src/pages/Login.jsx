import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // TODO: Add login logic
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row font-sans bg-white overflow-hidden">
        
        {/* Left Panel */}
        <AuthLeftPanel />

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[55%] p-8 sm:p-16 xl:p-24 flex flex-col justify-center">
          <div className="w-full max-w-[480px] mx-auto lg:ml-12 xl:ml-20">
            <h2 className="text-[3.5rem] font-extrabold text-[#2C3647] mb-12">Login</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full bg-white rounded-2xl p-4 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-sm font-bold text-[#64748B] mb-1">
                  Email or Username
                </label>
                <input 
                  type="text" 
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Enter your Email or Username" 
                  className="w-full text-base outline-none placeholder-gray-300 font-medium text-[#2C3647] bg-transparent"
                />
              </div>

              <div className="w-full bg-white rounded-2xl p-4 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <label className="block text-sm font-bold text-[#64748B] mb-1">
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
                className="w-full bg-[#FA7275] hover:bg-[#F95F63] text-white text-lg font-bold py-5 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(250,114,117,0.25)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.4)] hover:-translate-y-1 mt-8"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-12 text-sm font-medium text-[#64748B]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#FA7275] hover:text-[#F95F63] font-bold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Login;