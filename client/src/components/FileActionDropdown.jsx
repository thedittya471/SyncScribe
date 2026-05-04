import React from 'react'
import { createPortal } from 'react-dom'
import { Edit2, Info, Share2, Download, Trash, X } from 'lucide-react'

const ActionItem = ({ icon: Icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors group"
  >
    <div 
      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon size={18} color={color} strokeWidth={2.5} />
    </div>
    <span className="text-[#333F4E] font-semibold text-sm">{label}</span>
  </button>
)

const FileActionDropdown = ({ id, fileName, onClose, rect, onRename, onMoveToTrash, onShowDetails, onShare }) => {
  // Portal content
  const content = (
    <div 
      className="fixed bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[1000] border border-[#F2F4F8] animate-in fade-in zoom-in-95 duration-300 flex flex-col pointer-events-auto"
      style={{ 
        top: Math.max(20, rect.top - 20), // Lift it slightly above the card
        left: rect.left + (rect.width / 2) - 130, // Center 260px width over the card
        width: '260px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6 pb-4 flex justify-between items-center">
        <h3 className="text-[#333F4E] text-[1.1rem] font-bold truncate pr-4">{fileName}</h3>
        <button 
          onClick={onClose} 
          className="text-[#A3B2C7] hover:text-[#333F4E] transition-colors"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-col pb-4">
        <ActionItem icon={Edit2} label="Rename" color="#36D6B5" onClick={onRename} />
        <div className="h-[1px] bg-[#F2F4F8] mx-6 my-1" />
        <ActionItem icon={Info} label="Details" color="#A259FF" onClick={onShowDetails} />
        <div className="h-[1px] bg-[#F2F4F8] mx-6 my-1" />
        <ActionItem icon={Share2} label="Share" color="#FFB800" onClick={onShare} />
        <div className="h-[1px] bg-[#F2F4F8] mx-6 my-1" />
        <ActionItem icon={Download} label="Download" color="#56B8FF" />
        <div className="h-[1px] bg-[#F2F4F8] mx-6 my-1" />
        <ActionItem icon={Trash} label="Move to Trash" color="#FA7275" onClick={onMoveToTrash} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  )

  return createPortal(content, document.body)
}

export default FileActionDropdown
