import React from 'react';
import heroImage from '../assets/hero.png';

const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-[#FA7275] p-10 xl:p-16 flex-col justify-between relative overflow-hidden h-full">
      <div className="relative z-10 w-full max-w-[550px] mx-auto flex flex-col h-full pt-10 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 xl:mb-16 shrink-0">
          <div className="relative flex items-center w-[4.5rem] h-12">
            <div className="absolute left-0 w-12 h-12 bg-white/30 rounded-full"></div>
            <div className="absolute left-6 w-12 h-12 bg-white rounded-full"></div>
          </div>
          <span className="text-[2.2rem] font-bold text-white tracking-normal ml-2">SyncScribe</span>
        </div>

        {/* Typography */}
        <div className="shrink-0">
          <h1 className="text-4xl xl:text-[3.25rem] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Manage your files the best way
          </h1>
          <p className="text-white/90 text-lg font-medium leading-relaxed max-w-[95%]">
            Awesome, we've created the perfect place for you to store all your documents.
          </p>
        </div>

        {/* Illustration */}
        <div className="mt-8 flex justify-center items-center relative z-10 flex-1 min-h-0">
          <img
            src={heroImage}
            alt="Folder Illustration"
            className="w-full h-full max-w-[500px] object-contain hover:-translate-y-2 transition-transform duration-500 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
