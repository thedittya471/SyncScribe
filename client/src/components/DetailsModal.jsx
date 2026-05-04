import React from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, Image as ImageIcon, Video, FileQuestion } from 'lucide-react'

const DetailsModal = ({ fileData, onClose }) => {
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
      <div className="relative bg-white w-[480px] rounded-[32px] shadow-2xl p-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#333F4E] text-2xl font-bold w-full text-center">Details</h2>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#A3B2C7] hover:text-[#333F4E] transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* File Header Card */}
        <div className="bg-white border border-[#F2F4F8] rounded-[24px] p-6 flex items-center gap-5 mb-10 shadow-sm">
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

        {/* Property List */}
        <div className="space-y-6 px-4">
          <div className="flex items-center justify-between">
            <span className="text-[#A3B2C7] text-lg font-medium">Format:</span>
            <span className="text-[#333F4E] text-lg font-bold">{fileType === 'doc' ? 'PDF' : fileType.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A3B2C7] text-lg font-medium">Dimensions:</span>
            <span className="text-[#333F4E] text-lg font-bold">{fileSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A3B2C7] text-lg font-medium">Owner:</span>
            <span className="text-[#333F4E] text-lg font-bold">Kamlesh</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A3B2C7] text-lg font-medium">Last edit:</span>
            <span className="text-[#333F4E] text-lg font-bold">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default DetailsModal
