import React, { useRef, useState, useEffect } from 'react';
import { Search, CloudUpload, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFiles } from '../context/FileContext';
import SearchOverlay from './SearchOverlay';

const Topbar = () => {
  const { uploadFile, loading } = useFiles();
  const [query, setQuery] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleCloseSearch = () => {
    setIsOverlayOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) setIsOverlayOpen(true);
    else setIsOverlayOpen(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadFile(file);
  };

  return (
    <header className="w-full flex items-center justify-between py-6 px-4 md:px-8 bg-transparent shrink-0">

      {/* Search Bar */}
      <div className="flex-1 max-w-[550px] ml-2 lg:ml-8">
        <div className="relative flex items-center w-full h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] px-5 transition-shadow focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.08)] z-[10001]">
          <Search className="w-5 h-5 text-[#A3B2C7] shrink-0" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search documents..."
            value={query}
            onChange={handleSearchChange}
            onFocus={() => query.trim() && setIsOverlayOpen(true)}
            className="w-full h-full bg-transparent outline-none pl-3 text-[#333F4E] font-semibold text-sm placeholder-[#A3B2C7]"
          />
        </div>

        <SearchOverlay 
          isOpen={isOverlayOpen} 
          onClose={handleCloseSearch} 
          query={query} 
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 ml-auto">
        <Link 
          to="/trash" 
          className="w-12 h-12 flex items-center justify-center bg-white text-[#A3B2C7] hover:text-[#FA7275] rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
          title="Trash"
        >
          <Trash2 size={22} strokeWidth={2.5} />
        </Link>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={loading}
          className="flex items-center gap-2 bg-[#FA7275] hover:bg-[#F95F63] text-white px-7 py-2.5 rounded-full font-bold shadow-[0_8px_20px_rgba(250,114,117,0.3)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.45)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <CloudUpload className="w-5 h-5" strokeWidth={2.5} />
              <span>Upload</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
