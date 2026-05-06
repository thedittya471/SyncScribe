import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, Image as ImageIcon, Video, FileQuestion, UserPlus, Users, Search, Check } from 'lucide-react'
import { useFiles } from '../context/FileContext'
import { useAuth } from '../context/AuthContext'

const ShareModal = ({ fileData, onClose }) => {
  const { id, fileName, fileSize, timestamp, fileType, fileUrl } = fileData
  const { shareFile, revokeShareAccess } = useFiles();
  const { searchUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPermissions, setCurrentPermissions] = useState(fileData.permissions || []);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (email.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const users = await searchUsers(email);
      setSuggestions(users || []);
      setShowSuggestions(true);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [email, searchUsers]);

  const getIcon = () => {
    switch (fileType) {
      case 'doc':
      case 'pdf':
        return { icon: FileText, color: '#FA7275', bg: 'rgba(250, 114, 117, 0.1)' }
      case 'image':
        return { icon: ImageIcon, color: '#56B8FF', bg: 'rgba(86, 184, 255, 0.1)' }
      case 'video':
      case 'audio':
        return { icon: Video, color: '#36D6B5', bg: 'rgba(54, 214, 181, 0.1)' }
      default:
        return { icon: FileQuestion, color: '#A3B2C7', bg: 'rgba(163, 178, 199, 0.1)' }
    }
  }

  const { icon: Icon, color, bg } = getIcon()

  const handleShare = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const updatedFile = await shareFile(id, email);
      setCurrentPermissions(updatedFile.permissions || []);
      setEmail(''); // Clear input for next user
    } catch (error) {
      console.error("Sharing error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (userId) => {
    try {
      const updatedFile = await revokeShareAccess(id, userId);
      setCurrentPermissions(updatedFile.permissions || []);
    } catch (error) {
      console.error("Revocation error:", error);
    }
  };

  const selectSuggestion = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowSuggestions(false);
  };

  const content = (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center font-['Poppins',sans-serif]">
      <div className="absolute inset-0 bg-[#0F172A]/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-[500px] rounded-[40px] shadow-2xl p-10 animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#333F4E] text-2xl font-bold w-full text-center">Share File</h2>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#A3B2C7] hover:text-[#333F4E] transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="bg-white border border-[#F2F4F8] rounded-[24px] p-6 flex items-center gap-5 mb-8 shadow-sm">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
            style={{ backgroundColor: bg }}
          >
            {fileType === 'image' && fileUrl ? (
              <img src={fileUrl} alt={fileName} className="w-full h-full object-cover" />
            ) : (
              <Icon size={28} color={color} fill={color} fillOpacity={0.2} />
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-[#333F4E] text-xl font-bold truncate">{fileName}</h3>
            <p className="text-[#A3B2C7] text-sm font-medium">
              {fileSize} — {timestamp}
            </p>
          </div>
        </div>

        {/* Existing Shared List */}
        <div className="mb-8">
          <h4 className="text-[#333F4E] text-lg font-bold mb-4 flex items-center gap-2">
            <Users size={20} className="text-[#FA7275]" />
            Shared with:
          </h4>
          <div className="space-y-3">
            {currentPermissions.length > 0 ? (
              currentPermissions.map((perm) => (
                <div key={perm.user?._id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-2xl border border-[#F2F4F8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FA7275]/10 flex items-center justify-center text-[#FA7275] font-bold text-sm">
                      {perm.user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#333F4E] text-sm font-bold">{perm.user?.fullName || perm.user?.username}</span>
                      <span className="text-[#A3B2C7] text-xs">{perm.user?.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white text-[#A3B2C7] text-[10px] font-bold rounded-lg border border-[#F2F4F8] uppercase tracking-wider">
                      {perm.role}
                    </span>
                    <button
                      onClick={() => handleRevoke(perm.user?._id)}
                      className="p-1.5 text-[#A3B2C7] hover:text-[#FA7275] hover:bg-[#FA7275]/5 rounded-lg transition-all"
                      title="Remove Access"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#A3B2C7] text-sm italic px-1">Not shared with anyone yet.</p>
            )}
          </div>
        </div>

        <div className="mb-8 relative" ref={suggestionRef}>
          <label className="block text-[#333F4E] text-lg font-bold mb-3 flex items-center gap-2">
            <UserPlus size={20} className="text-[#FA7275]" />
            Share with user:
          </label>
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => email.length >= 2 && setShowSuggestions(true)}
              placeholder="Enter email address"
              className="w-full h-14 bg-white border border-[#F2F4F8] rounded-2xl px-6 text-[#333F4E] font-medium outline-none shadow-sm focus:shadow-md focus:border-[#FA7275]/30 transition-all placeholder:text-[#A3B2C7]/60"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#F2F4F8] rounded-2xl shadow-xl z-[2010] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => selectSuggestion(user.email)}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F9FAFB] transition-colors text-left border-b border-[#F2F4F8] last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FA7275]/10 flex items-center justify-center text-[#FA7275]">
                      <Search size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#333F4E] text-sm font-bold truncate">{user.fullName}</p>
                      <p className="text-[#A3B2C7] text-xs truncate">{user.email}</p>
                    </div>
                    {email === user.email && <Check size={16} className="text-[#36D6B5]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="mt-3 text-[#A3B2C7] text-xs font-medium px-1">
            Type at least 2 characters to see available users.
          </p>
        </div>

        <div className="mb-10 p-5 bg-[#F9FAFB] rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Users size={18} className="text-[#A3B2C7]" />
          </div>
          <div>
            <p className="text-[#333F4E] text-sm font-bold">Privacy Control</p>
            <p className="text-[#A3B2C7] text-[11px] font-medium">Recipient will get 'Viewer' access by default.</p>
          </div>
        </div>

        <button 
          onClick={handleShare}
          disabled={loading || !email.trim()}
          className="w-full h-16 bg-[#FA7275] hover:bg-[#F95F63] text-white rounded-full text-xl font-bold shadow-[0_8px_20px_rgba(250,114,117,0.3)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.45)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sharing...</span>
            </div>
          ) : 'Share Now'}
        </button>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default ShareModal
