import React from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger"
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[400px] bg-white rounded-[24px] p-8 shadow-2xl animate-scale-up font-['Poppins',sans-serif]">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
            type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
          }`}>
            <AlertTriangle size={32} strokeWidth={1.5} />
          </div>

          <h2 className="text-[#333F4E] text-2xl font-bold mb-2">
            {title}
          </h2>
          
          <p className="text-[#333F4E]/60 text-sm mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-[#333F4E] font-semibold hover:bg-gray-100 transition-all border border-gray-100"
            >
              {cancelText}
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className={`flex-1 py-3.5 rounded-xl text-white font-semibold shadow-lg shadow-black/5 transition-all active:scale-[0.98] ${
                type === 'danger' ? 'bg-[#FA7275] hover:bg-[#ff5a5e]' : 'bg-[#36D6B5] hover:bg-[#2bc4a4]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out both; }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      `}</style>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
