import React, { useEffect } from 'react'
import Dashboardbox from '../components/Dashboardbox'
import { folderCategories, recentFiles, storageInfo } from '../data'

const StorageRing = ({ percentage }) => {
  const radius = 60
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
      {/* Track */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={stroke}
        fill="none"
      />
      {/* Progress */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        stroke="white"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

const FileIcon = ({ color }) => (
  <div
    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
    style={{ backgroundColor: `${color}20` }}
  >
    <div className="w-4 h-4 rounded-sm transition-transform duration-200 group-hover:rotate-12" style={{ backgroundColor: color }} />
  </div>
)

const DotsMenu = () => (
  <button className="flex flex-col gap-[3px] p-1 opacity-40 hover:opacity-70 transition-opacity">
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
  </button>
)

/* ══════════════════════════════════════════
   DASHBOARD PAGE
   ══════════════════════════════════════════ */
const Dashboard = () => {
  // Load Poppins font
  useEffect(() => {
    if (!document.querySelector('link[href*="Poppins"]')) {
      const link = document.createElement('link')
      link.href =
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div className="w-full font-['Poppins',sans-serif]">
      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out both; }
        .animate-fade-in-right { animation: fadeInRight 0.5s ease-out both; }
      `}</style>

      <div className="max-w-[1100px] mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/5 p-10 border border-white/40">
        <div className="flex gap-10 flex-col lg:flex-row">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1">

            {/* Storage card */}
            <div className="rounded-2xl p-8 flex items-center gap-8 transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 hover:scale-[1.02] cursor-pointer animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
              }}
            >
              {/* Ring */}
              <div className="relative">
                <StorageRing percentage={storageInfo.percentage} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">{storageInfo.percentage}%</span>
                  <span className="text-xs opacity-80">Space used</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-white">
                <h2 className="text-xl font-semibold mb-1">Available Storage</h2>
                <p className="text-base opacity-90">
                  {storageInfo.usedGB}GB / {storageInfo.totalGB}GB
                </p>
              </div>
            </div>

            {/* Folder grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Staggered animation delay per card */}
              {folderCategories.map((folder) => (
                <Dashboardbox
                  key={folder.id}
                  title={folder.title}
                  size={folder.size}
                  lastUpdateTime={folder.lastUpdateTime}
                  iconColor={folder.iconColor}
                  iconType={folder.iconType}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Recent files ── */}
          <div className="w-full lg:w-[380px]">
            <h2 className="text-xl font-bold text-[#333F4E] mb-6 animate-fade-in-right">
              Recent files uploaded
            </h2>

            <div className="flex flex-col gap-2">
              {recentFiles.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 group rounded-xl px-3 py-2 transition-all duration-200 hover:bg-[#F2F4F8]/80 hover:shadow-sm cursor-pointer animate-fade-in-right"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Icon */}
                  <FileIcon color={file.iconColor} />

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#333F4E] text-sm font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-[#A3B2C7] text-xs">{file.time}</p>
                  </div>

                  {/* Menu dots */}
                  <DotsMenu />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
