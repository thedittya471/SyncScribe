import React from 'react'
import { createPortal } from 'react-dom'
import { Edit2, Info, Share2, Download, Trash, X } from 'lucide-react'

const ActionItem = ({ icon: Icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-6 py-2.5 hover:bg-[#F9FAFB] transition-all duration-200 group border-b border-[#F2F4F8] last:border-b-0"
  >
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"
      style={{ backgroundColor: `${color}10` }}
    >
      <Icon size={16} color={color} strokeWidth={2.5} />
    </div>
    <span className="text-[#333F4E] font-medium text-sm transition-colors group-hover:text-black">{label}</span>
  </button>
)

const FileActionDropdown = ({ id, fileName, onClose, rect, onRename, onMoveToTrash, onShowDetails, onShare, onDownload }) => {
  const content = (
    <div 
      className="fixed bg-white rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-[20000] border border-[#F2F4F8] animate-in fade-in zoom-in-95 duration-300 flex flex-col pointer-events-auto overflow-hidden font-['Poppins',sans-serif]"
      style={{ 
        top: Math.max(20, rect.top + rect.height/2 - 130), 
        left: rect.left + rect.width/2 - 120,
        width: '240px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 pb-3 border-b border-[#F2F4F8]">
        <h3 className="text-[#333F4E] text-base font-bold text-center truncate">{fileName}</h3>
      </div>

      <div className="flex flex-col">
        <ActionItem icon={Edit2} label="Rename" color="#36D6B5" onClick={onRename} />
        <ActionItem icon={Info} label="Details" color="#A259FF" onClick={onShowDetails} />
        <ActionItem icon={Share2} label="Share" color="#FFB800" onClick={onShare} />
        <ActionItem icon={Download} label="Download" color="#3B82F6" onClick={onDownload} />
        <ActionItem icon={Trash} label="Move to Trash" color="#FA7275" onClick={onMoveToTrash} />
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default FileActionDropdown
