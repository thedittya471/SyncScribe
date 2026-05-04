import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const FileUploadItem = ({ name, progress, timeRemaining, type }) => {
  // Simple icon selector based on type
  const getIcon = () => {
    switch (type) {
      case 'figma':
        return (
          <div className="w-10 h-10 rounded-full bg-[#F2F4F8] flex items-center justify-center">
            <svg width="20" height="30" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 28.5C9.5 23.2533 13.7533 19 19 19C24.2467 19 28.5 23.2533 28.5 28.5V38H19C13.7533 38 9.5 33.7467 9.5 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M0 28.5C0 23.2533 4.2533 19 9.5 19H19V38H9.5C4.2533 38 0 33.7467 0 28.5Z" fill="#A259FF"/>
              <path d="M0 9.5C0 4.2533 4.2533 0 9.5 0H19V19H9.5C4.2533 19 0 14.7467 0 9.5Z" fill="#F24E1E"/>
              <path d="M19 0H28.5C33.7467 0 38 4.2533 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
            </svg>
          </div>
        )
      case 'sketch':
        return (
          <div className="w-10 h-10 rounded-full bg-[#F2F4F8] flex items-center justify-center">
            <svg width="24" height="22" viewBox="0 0 512 476" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 0L42.5 130.5L256 475.5L469.5 130.5L256 0Z" fill="#FDB300"/>
              <path d="M256 0L149.5 130.5H362.5L256 0Z" fill="#FDD231"/>
              <path d="M149.5 130.5L256 475.5L362.5 130.5H149.5Z" fill="#EA6C00"/>
              <path d="M42.5 130.5L256 475.5L149.5 130.5H42.5Z" fill="#FDAD00"/>
              <path d="M469.5 130.5L256 475.5L362.5 130.5H469.5Z" fill="#FDAD00"/>
            </svg>
          </div>
        )
      default:
        return <div className="w-10 h-10 rounded-full bg-[#F2F4F8]" />
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] mb-3 group animate-in slide-in-from-right duration-300 transition-all hover:border-[#E2E8F0]">
      {getIcon()}
      
      <div className="flex-1 min-w-0">
        <h4 className="text-[#333F4E] text-[13px] font-bold truncate leading-tight">{name}</h4>
        <p className="text-[#A3B2C7] text-[11px] font-medium">{timeRemaining}</p>
      </div>

      <div className="flex items-center gap-3 ml-2">
        {/* Progress Bar Container */}
        <div className="relative w-20 h-[6px] bg-[#FEE8E8] rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#FA7275] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <button className="text-[#D1D9E2] hover:text-[#FA7275] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#D1D9E2" />
            <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const FileUploadPopup = () => {
  const [uploads, setUploads] = useState([
    { id: 1, name: 'App.fig', progress: 45, timeRemaining: '5 Mins Remaining', type: 'figma' },
    { id: 2, name: 'Design ANC.sketch', progress: 75, timeRemaining: '5 Mins Remaining', type: 'sketch' }
  ])

  // Simulate progress for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setUploads(prev => prev.map(u => {
        if (u.progress >= 100) return u
        return { ...u, progress: Math.min(u.progress + Math.random() * 5, 100) }
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (uploads.length === 0) return null

  return (
    <div className="fixed bottom-8 right-8 w-[380px] z-[100] font-['Poppins',sans-serif]">
      <div className="bg-white rounded-[24px] shadow-2xl shadow-black/10 border border-[#F2F4F8] p-6 animate-in slide-in-from-bottom duration-500">
        <h3 className="text-[#333F4E] text-lg font-bold mb-6">In Progress</h3>
        
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {uploads.map(upload => (
            <FileUploadItem 
              key={upload.id}
              name={upload.name}
              progress={upload.progress}
              timeRemaining={upload.timeRemaining}
              type={upload.type}
            />
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #F2F4F8;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default FileUploadPopup
