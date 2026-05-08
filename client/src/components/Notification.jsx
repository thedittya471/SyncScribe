import React from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const Notification = ({ type, message, visible }) => {
  if (!visible) return null;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-1000 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform font-['Poppins',sans-serif]
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        ${type === 'loading' ? 'bg-[#333F4E] text-white' : 
          type === 'success' ? 'bg-[#27AE60] text-white' : 
          'bg-[#FA7275] text-white'}
      `}
    >
      <div className="flex items-center justify-center">
        {type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
        {type === 'success' && <CheckCircle2 className="w-5 h-5" />}
        {type === 'error' && <XCircle className="w-5 h-5" />}
      </div>
      <p className="text-sm font-semibold tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default Notification;
