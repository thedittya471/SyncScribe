import React, { useRef } from 'react'
import { useFileActions } from '../context/FileActionContext'

import { FileTypeIcon } from './FileTypeIcon'

/* ══════════════════════════════════════════
   DocumentBox Component
   ══════════════════════════════════════════ */
const DocumentBox = ({
  id,
  fileName = 'App School.doc',
  fileSize = '2 GB',
  timestamp = '10:09pm, 10 Oct',
  fileType = 'doc',
  fileUrl = '',
}) => {
  const { activeFile, openDropdown } = useFileActions()
  const cardRef = useRef(null)

  const isDropdownOpen = activeFile?.id === id

  const handleOpen = () => {
    if (!fileUrl) return;
    const ext = fileName.split('.').pop().toLowerCase();
    const docs = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'];
    if (docs.includes(ext)) {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`, '_blank');
    } else {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={handleOpen}
      className={`relative w-[195px] h-[170px] bg-white rounded-[16px] font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out 
      ${isDropdownOpen ? 'z-[110] shadow-2xl scale-[1.02]' : 'z-10 shadow-md hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1'}`}>
      
      {/* ── File type icon in colored circle (top-left) ── */}
      <div className="absolute left-[14px] top-[14px] transition-transform duration-300 group-hover:scale-105">
        <svg width="68" height="68" viewBox="0 0 82 82"><FileTypeIcon type={fileType} name={fileName} /></svg>
      </div>

      {/* ── Three-dot menu (top-right) ── */}
      <button 
        className="absolute right-[12px] top-[14px] p-1 opacity-50 hover:opacity-90 transition-opacity z-[101]"
        onClick={(e) => {
          e.stopPropagation()
          const rect = cardRef.current.getBoundingClientRect()
          openDropdown({ 
            id, 
            name: fileName, 
            size: fileSize, 
            time: timestamp, 
            type: fileType 
          }, rect)
        }}
      >
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

export default DocumentBox
