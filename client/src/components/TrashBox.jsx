import React from 'react'
import { FileText, Image as ImageIcon, Video, Play, Mic, Music, FileQuestion, RotateCcw, Trash2 } from 'lucide-react'

const TrashBox = ({ fileName, fileSize, timestamp, fileType }) => {
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

  return (
    <div className="relative w-[195px] h-[170px] bg-white rounded-[16px] shadow-md font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1">
      <div className="absolute left-[14px] top-[14px] transition-transform duration-300 group-hover:scale-105">
        <div 
          className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <Icon size={32} color={color} fill={color} fillOpacity={0.2} />
        </div>
      </div>

      <div className="absolute right-[12px] top-[14px] flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-1.5 bg-[#F2F4F8] rounded-full text-[#333F4E] hover:bg-[#FA7275] hover:text-white transition-all shadow-sm" title="Restore">
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
        <button className="p-1.5 bg-[#F2F4F8] rounded-full text-[#333F4E] hover:bg-[#FA7275] hover:text-white transition-all shadow-sm" title="Delete Permanently">
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>

      <span className="absolute right-[14px] top-[68px] text-[#333F4E] text-base font-medium">
        {fileSize}
      </span>

      <h3 className="absolute left-[14px] bottom-[32px] text-[#333F4E] text-[13px] font-semibold truncate max-w-[165px]">
        {fileName}
      </h3>

      <p className="absolute left-[14px] bottom-[12px] text-[#333F4E]/70 text-xs">
        {timestamp}
      </p>
    </div>
  )
}

export default TrashBox
