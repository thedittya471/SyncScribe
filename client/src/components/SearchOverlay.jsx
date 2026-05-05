import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, FileText, Clock, MoreVertical } from 'lucide-react';
import { useFiles } from '../context/FileContext';
import { formatBytes } from '../utils/format';
import { FileTypeIcon } from './FileTypeIcon';
import { useFileActions } from '../context/FileActionContext';
import FileActionDropdown from './FileActionDropdown';

const SearchOverlay = ({ isOpen, onClose, query }) => {
  const { searchGlobalFiles } = useFiles();
  const { openDropdown, isRenameModalOpen, isTrashModalOpen, isDetailsModalOpen, isShareModalOpen } = useFileActions();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Close search overlay if any modal opens
  useEffect(() => {
    if (isRenameModalOpen || isTrashModalOpen || isDetailsModalOpen || isShareModalOpen) {
      onClose();
    }
  }, [isRenameModalOpen, isTrashModalOpen, isDetailsModalOpen, isShareModalOpen, onClose]);

  useEffect(() => {
    if (isOpen && query) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const data = await searchGlobalFiles(query);
          setResults(data || []);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setLoading(false);
        }
      };
      
      const debounce = setTimeout(fetchResults, 300);
      return () => clearTimeout(debounce);
    } else {
      setResults([]);
    }
  }, [isOpen, query, searchGlobalFiles]);

  const onOpenMenu = (e, file) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    openDropdown({
      id: file._id,
      name: file.name,
      type: file.type,
      size: formatBytes(file.size),
      time: new Date(file.createdAt).toLocaleDateString()
    }, rect);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex flex-col items-center pt-[10vh] px-4 font-['Poppins',sans-serif]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Search Container */}
      <div className="relative w-full max-w-[700px] bg-white rounded-[28px] shadow-2xl shadow-black/20 overflow-hidden animate-scale-up border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
          <Search className="text-[#A3B2C7]" size={22} strokeWidth={2.5} />
          <div className="flex-1 text-[#333F4E] font-semibold text-lg">
            Search Results for "{query}"
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-[#FA7275]/20 border-t-[#FA7275] rounded-full animate-spin" />
              <p className="text-[#A3B2C7] text-sm font-medium">Searching across your files...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-3 grid grid-cols-1 gap-2">
              {results.map((file) => (
                <div 
                  key={file._id}
                  onClick={() => { window.open(file.url, '_blank'); onClose(); }}
                  className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F8FAFC] transition-all cursor-pointer border border-transparent hover:border-[#E2E8F0] relative"
                >
                  <div className="w-12 h-12 flex-shrink-0 relative">
                    <div className="absolute inset-0 scale-[0.6] origin-center">
                      <FileTypeIcon type={file.type} name={file.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#333F4E] font-bold text-sm truncate group-hover:text-[#FA7275] transition-colors pr-8">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-0.5 text-[#A3B2C7] text-xs">
                      <span className="flex items-center gap-1">
                        <FileText size={12} /> {formatBytes(file.size)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(file.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => onOpenMenu(e, file)}
                    className="p-2 hover:bg-gray-100 rounded-full text-[#A3B2C7] hover:text-[#333F4E] transition-all"
                  >
                    <MoreVertical size={18} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-[#333F4E] font-bold text-lg">No matches found</h3>
              <p className="text-[#A3B2C7] text-sm max-w-[280px] mt-1">
                We couldn't find any files matching "{query}". Try checking your spelling or using different keywords.
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-gray-100 flex items-center justify-between">
          <p className="text-[#A3B2C7] text-[11px] font-medium uppercase tracking-wider">
            {results.length} files found
          </p>
          <div className="flex items-center gap-4 text-[#A3B2C7] text-[11px]">
            <span className="flex items-center gap-1.5"><kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-gray-500">ESC</kbd> to close</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9) translateY(-20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out both; }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>,
    document.body
  );
};

export default SearchOverlay;
