import React from 'react'

const ImageBox = ({
  fileName = 'App School.png',
  fileSize = '2 GB',
  timestamp = '10:09pm, 10 Oct',
  imageUrl = 'https://picsum.photos/200',
}) => {
  return (
    <div className="relative w-[195px] h-[170px] bg-white rounded-[16px] shadow-md font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1">
      
      {/* ── Image Preview (top-left) ── */}
      <div className="absolute left-[14px] top-[14px] w-[68px] h-[68px] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-gray-100">
        <img 
          src={imageUrl} 
          alt={fileName} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Three-dot menu (top-right) ── */}
      <button className="absolute right-[12px] top-[14px] p-1 opacity-50 hover:opacity-90 transition-opacity">
        <svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="5" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="15" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="25" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
        </svg>
      </button>

      {/* ── File size (right side, below dots) ── */}
      <span className="absolute right-[14px] top-[68px] text-[#333F4E] text-base font-medium">
        {fileSize}
      </span>

      {/* ── File name ── */}
      <h3 className="absolute left-[14px] bottom-[32px] text-[#333F4E] text-[13px] font-semibold truncate max-w-[165px] transition-colors duration-200 group-hover:text-[#1a202c]">
        {fileName}
      </h3>

      {/* ── Timestamp ── */}
      <p className="absolute left-[14px] bottom-[12px] text-[#333F4E]/70 text-xs">
        {timestamp}
      </p>
    </div>
  )
}

export default ImageBox
