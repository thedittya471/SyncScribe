import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const RenameModal = ({ fileName, onClose, onSave }) => {
  const [newName, setNewName] = useState(fileName)

  useEffect(() => {
    setNewName(fileName)
  }, [fileName])

  const content = (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center font-['Poppins',sans-serif]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white w-[380px] rounded-[32px] shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#333F4E] text-2xl font-bold w-full text-center">Rename</h2>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#A3B2C7] hover:text-[#333F4E] transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full h-14 bg-white border border-[#F2F4F8] rounded-2xl px-6 text-[#333F4E] font-medium outline-none shadow-sm focus:shadow-md transition-shadow"
              autoFocus
            />
          </div>

          <button 
            onClick={() => onSave(newName)}
            className="w-full h-14 bg-[#FA7275] hover:bg-[#F95F63] text-white rounded-full text-lg font-bold shadow-[0_8px_20px_rgba(250,114,117,0.3)] hover:shadow-[0_8px_25px_rgba(250,114,117,0.45)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default RenameModal
