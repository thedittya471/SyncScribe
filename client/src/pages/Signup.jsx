import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-white">
        
        {/* Left Panel */}
        <AuthLeftPanel />

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[55%] p-6 sm:p-12 xl:p-24 flex flex-col justify-center">
          <div className="w-full max-w-[480px] mx-auto lg:ml-12 xl:ml-20 my-auto">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-3 mb-10">
              <div className="relative flex items-center w-12 h-8">
                <div className="absolute left-0 w-8 h-8 bg-[#FA7275]/30 rounded-full"></div>
                <div className="absolute left-4 w-8 h-8 bg-[#FA7275] rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-[#2C3647]">SyncScribe</span>
            </div>
            <h2 className="text-4xl sm:text-[3rem] xl:text-[3.5rem] font-extrabold text-[#2C3647] mb-8 lg:mb-10">Sign Up</h2>
            
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

              {error && (
                <div className="bg-rose-50 text-rose-500 p-4 rounded-xl text-sm font-bold border border-rose-100">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#FA7275] hover:bg-[#F95F63] text-white text-lg font-bold py-4 xl:py-5 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(250,114,117,0.25)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.4)] hover:-translate-y-1 mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : 'Sign Up'}
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
