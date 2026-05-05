import React, { useState } from 'react'
import { RotateCcw, Trash2 } from 'lucide-react'
import { FileTypeIcon } from './FileTypeIcon'
import ConfirmationModal from './ConfirmationModal'

const TrashBox = ({ id, fileName, fileSize, timestamp, fileType, onRestore, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="relative w-[195px] h-[170px] bg-white rounded-[16px] shadow-md font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1">
      {/* ── File type icon ── */}
      <div className="absolute left-[14px] top-[14px] transition-transform duration-300 group-hover:scale-105">
        <svg width="68" height="68" viewBox="0 0 82 82">
          <FileTypeIcon type={fileType} name={fileName} />
        </svg>
      </div>

      {/* ── Action Buttons (Restore / Permanent Delete) ── */}
      <div className="absolute right-[12px] top-[14px] flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.stopPropagation(); onRestore(); }}
          className="p-1.5 bg-[#F2F4F8] rounded-full text-[#333F4E] hover:bg-[#36D6B5] hover:text-white transition-all shadow-sm" 
          title="Restore"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }}
          className="p-1.5 bg-[#F2F4F8] rounded-full text-[#333F4E] hover:bg-[#FA7275] hover:text-white transition-all shadow-sm" 
          title="Delete Permanently"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        title="Delete File Permanently?"
        message={`Are you sure you want to delete "${fileName}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {/* ── File Size ── */}
      <span className="absolute right-[14px] top-[68px] text-[#333F4E] text-base font-medium">
        {fileSize}
      </span>

      {/* ── File Name ── */}
      <h3 className="absolute left-[14px] bottom-[32px] text-[#333F4E] text-[13px] font-semibold truncate max-w-[165px]">
        {fileName}
      </h3>

      {/* ── Timestamp ── */}
      <p className="absolute left-[14px] bottom-[12px] text-[#333F4E]/70 text-xs">
        {timestamp}
      </p>
    </div>
  )
}

export default TrashBox
