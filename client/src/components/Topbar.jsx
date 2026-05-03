import React from 'react';
import { Search, CloudUpload, LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="w-full flex items-center justify-between py-6 px-4 md:px-8 bg-transparent shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-[550px] ml-2 lg:ml-8">
        <div className="relative flex items-center w-full h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] px-5 transition-shadow focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
          <Search className="w-5 h-5 text-[#A3B2C7] shrink-0" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full h-full bg-transparent outline-none pl-3 text-[#333F4E] font-semibold text-sm placeholder-[#A3B2C7]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 ml-auto">
        <button className="flex items-center gap-2 bg-[#FA7275] hover:bg-[#F95F63] text-white px-7 py-2.5 rounded-full font-bold shadow-[0_8px_20px_rgba(250,114,117,0.3)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.45)] hover:-translate-y-0.5 transition-all duration-300">
          <CloudUpload className="w-5 h-5" strokeWidth={2.5} />
          <span>Upload</span>
        </button>

        <button className="text-[#FA7275] hover:text-[#F95F63] hover:scale-110 transition-transform duration-200 ml-2">
          <LogOut className="w-[1.4rem] h-[1.4rem]" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
