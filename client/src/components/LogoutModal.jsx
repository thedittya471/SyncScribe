import React from 'react';
import { LogOut, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-8">
            <LogOut className="w-10 h-10 text-rose-500" />
          </div>

          <h2 className="text-3xl font-black text-[#0F172A] mb-4">Logging Out?</h2>
          <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
            Are you sure you want to end your session? You'll need to log back in to access your files.
          </p>

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-500/20 active:scale-95"
            >
              Logout Now
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-2xl transition-all active:scale-95"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
