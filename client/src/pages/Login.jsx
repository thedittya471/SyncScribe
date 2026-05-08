import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
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
      await login({
        email: formData.identifier,
        username: formData.identifier,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-white">
        
        {/* Left Panel */}
        <AuthLeftPanel />

        {/* Right Panel - Form */}
        <div className="w-full lg:w-[55%] p-6 sm:p-16 xl:p-24 flex flex-col justify-center">
          <div className="w-full max-w-[480px] mx-auto lg:ml-12 xl:ml-20">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-3 mb-10">
              <div className="relative flex items-center w-12 h-8">
                <div className="absolute left-0 w-8 h-8 bg-[#FA7275]/30 rounded-full"></div>
                <div className="absolute left-4 w-8 h-8 bg-[#FA7275] rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-[#2C3647]">SyncScribe</span>
            </div>
            <h2 className="text-4xl sm:text-[3.5rem] font-extrabold text-[#2C3647] mb-8 lg:mb-12">Login</h2>
            
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

              {error && (
                <div className="bg-rose-50 text-rose-500 p-4 rounded-xl text-sm font-bold border border-rose-100">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#FA7275] hover:bg-[#F95F63] text-white text-lg font-bold py-4 sm:py-5 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(250,114,117,0.25)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.4)] active:scale-95 mt-6 sm:mt-8 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : 'Login'}
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