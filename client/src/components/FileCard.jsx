import React, { useRef, useState } from 'react'
import { RotateCcw, Trash2 } from 'lucide-react'
import { useFileActions } from '../context/FileActionContext'
import { FileTypeIcon } from './FileTypeIcon'
import ConfirmationModal from './ConfirmationModal'

const FileCard = ({
  id,
  fileName,
  fileSize,
  timestamp,
  fileType,
  fileUrl,
  isTrashed = false,
  onRestore,
  onDelete,
  owner,
  permissions
}) => {
  const { activeFile, openDropdown } = useFileActions()
  const cardRef = useRef(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const isDropdownOpen = activeFile?.id === id

  const handleOpen = () => {
    if (!fileUrl) return;
    if (isTrashed) return;

    const ext = fileName.split('.').pop().toLowerCase();
    const docs = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'];
    
    if (docs.includes(ext)) {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`, '_blank');
    } else {
      window.open(fileUrl, '_blank');
    }
  };

  const handleOpenDropdown = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    openDropdown({
      id,
      name: fileName,
      size: fileSize,
      time: timestamp,
      type: fileType,
      url: fileUrl,
      owner,
      permissions
    }, rect);
  };



  return (
    <div 
      ref={cardRef}
      onClick={handleOpen}
      className={`relative w-[195px] h-[170px] bg-white rounded-[16px] font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out 
      ${isDropdownOpen ? 'z-[110] shadow-2xl scale-[1.02]' : 'z-10 shadow-md hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1'}`}
    >
      {/* ── File icon/Preview (top-left) ── */}
      <div className="absolute left-[14px] top-[14px] transition-transform duration-300 group-hover:scale-105">
        {fileType === 'image' && fileUrl && !isTrashed ? (
          <div className="w-[68px] h-[68px] rounded-full overflow-hidden border border-gray-100">
            <img src={fileUrl} alt={fileName} className="w-full h-full object-cover" />
          </div>
        ) : (
          <svg width="68" height="68" viewBox="0 0 82 82">
            <FileTypeIcon type={fileType} name={fileName} />
          </svg>
        )}
      </div>

      {/* ── Action Area (top-right) ── */}
      <div className="absolute right-[12px] top-[14px] z-[101]">
        {isTrashed ? (
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        ) : (
          <button 
            className="p-1 opacity-50 hover:opacity-90 transition-opacity"
            onClick={handleOpenDropdown}
          >
            <svg width="14" height="30" viewBox="0 0 14 30" fill="none">
              <circle cx="7" cy="5" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
              <circle cx="7" cy="15" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
              <circle cx="7" cy="25" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
            </svg>
          </button>
        )}
      </div>

      {isTrashed && (
        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={onDelete}
          title="Delete File Permanently?"
          message={`Are you sure you want to delete "${fileName}"? This action cannot be undone.`}
          confirmText="Delete"
          type="danger"
        />
      )}

      {/* ── File details ── */}
      <span className="absolute right-[14px] top-[68px] text-[#333F4E] text-base font-medium">
        {fileSize}
      </span>

      <h3 className="absolute left-[14px] bottom-[32px] text-[#333F4E] text-[13px] font-semibold truncate max-w-[165px] transition-colors duration-200 group-hover:text-black">
        {fileName}
      </h3>

      <p className="absolute left-[14px] bottom-[12px] text-[#333F4E]/70 text-xs flex items-center gap-2">
        {timestamp}
        {owner && (
          <span className="flex items-center gap-1 text-[#FA7275] font-semibold">
            <span className="w-1 h-1 rounded-full bg-[#A3B2C7]" />
            By {owner.username}
          </span>
        )}
      </p>
    </div>
  )
}

export default FileCard;
