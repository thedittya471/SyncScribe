import React from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, Image as ImageIcon, Video, FileQuestion } from 'lucide-react'

const users = [
  { name: 'Arthur', avatar: 'https://i.pravatar.cc/150?u=arthur' },
  { name: 'Silvia', avatar: 'https://i.pravatar.cc/150?u=silvia' },
  { name: 'Richard', avatar: 'https://i.pravatar.cc/150?u=richard' },
  { name: 'Michael', avatar: 'https://i.pravatar.cc/150?u=michael' },
]

const ShareModal = ({ fileData, onClose }) => {
  const { fileName, fileSize, timestamp, fileType } = fileData

  const getIcon = () => {
    switch (fileType) {
      case 'doc':
        return { icon: FileText, color: '#FA7275', bg: 'rgba(250, 114, 117, 0.1)' }
      case 'image':
        return { icon: ImageIcon, color: '#56B8FF', bg: 'rgba(86, 184, 255, 0.1)' }
      case 'video':
        return { icon: Video, color: '#36D6B5', bg: 'rgba(54, 214, 181, 0.1)' }
      default:
        return { icon: FileQuestion, color: '#A3B2C7', bg: 'rgba(163, 178, 199, 0.1)' }
    }
  }

  const { icon: Icon, color, bg } = getIcon()

  const content = (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center font-['Poppins',sans-serif]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white w-[500px] rounded-[40px] shadow-2xl p-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#333F4E] text-2xl font-bold w-full text-center">Share File</h2>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#A3B2C7] hover:text-[#333F4E] transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* File Header Card */}
        <div className="bg-white border border-[#F2F4F8] rounded-[24px] p-6 flex items-center gap-5 mb-8 shadow-sm">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: bg }}
          >
            <Icon size={28} color={color} fill={color} fillOpacity={0.2} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-[#333F4E] text-xl font-bold truncate">{fileName}</h3>
            <p className="text-[#A3B2C7] text-sm font-medium">
              {fileSize} — {timestamp}
            </p>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-8">
          <label className="block text-[#333F4E] text-lg font-bold mb-3">Share file with other users:</label>
          <input 
            type="email" 
            placeholder="Enter email address"
            className="w-full h-14 bg-white border border-[#F2F4F8] rounded-2xl px-6 text-[#333F4E] font-medium outline-none shadow-sm focus:shadow-md transition-shadow placeholder:text-[#A3B2C7]/60"
          />
        </div>

        {/* Shared With List */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-[#333F4E] text-lg font-bold">Share with users</h4>
            <span className="text-[#A3B2C7] font-semibold">{users.length} users</span>
          </div>
          <div className="flex items-center gap-6">
            {users.map((user) => (
              <div key={user.name} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#A3B2C7] text-sm font-medium">{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full h-16 bg-[#FA7275] hover:bg-[#F95F63] text-white rounded-full text-xl font-bold shadow-[0_8px_20px_rgba(250,114,117,0.3)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.45)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Share Now
        </button>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default ShareModal
