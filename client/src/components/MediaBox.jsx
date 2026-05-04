import React from 'react'
import { Play, Mic, Music } from 'lucide-react'

const MediaBox = ({ fileName, fileSize, timestamp, fileType }) => {
  const getIcon = () => {
    switch (fileType) {
      case 'video':
        return { icon: Play, color: '#FA7275', bg: 'rgba(250, 114, 117, 0.1)' }
      case 'audio':
        return { icon: Mic, color: '#56B8FF', bg: 'rgba(86, 184, 255, 0.1)' }
      case 'music':
        return { icon: Music, color: '#36D6B5', bg: 'rgba(54, 214, 181, 0.1)' }
      default:
        return { icon: Play, color: '#FA7275', bg: 'rgba(250, 114, 117, 0.1)' }
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

      <button className="absolute right-[12px] top-[14px] p-1 opacity-50 hover:opacity-90 transition-opacity">
        <svg width="14" height="30" viewBox="0 0 14 30" fill="none">
          <circle cx="7" cy="5" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="15" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="25" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
        </svg>
      </button>

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

export default MediaBox
