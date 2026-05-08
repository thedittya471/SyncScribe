import React, { useEffect, useMemo } from 'react'
import Dashboardbox from '../components/Dashboardbox'
import { useFiles } from '../context/FileContext'
import { useFileActions } from '../context/FileActionContext'
import { formatBytes } from '../utils/format'

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(date).toLocaleDateString();
};

const StorageRing = ({ percentage }) => {
  const radius = 60
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={stroke}
        fill="none"
      />
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

const FileIcon = ({ color, ext = '??' }) => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
    style={{ backgroundColor: `${color}15` }}
  >
    <div className="flex flex-col items-center justify-center">
       <span className="text-[10px] font-bold" style={{ color: color }}>{ext.toUpperCase().slice(0, 3)}</span>
    </div>
  </div>
)

const DotsMenu = () => (
  <button className="flex flex-col gap-[3px] p-1 opacity-40 hover:opacity-70 transition-opacity">
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
  </button>
)

const Dashboard = () => {
  const { dashboardData, recentFiles, getDashboardData, getRecentFiles } = useFiles();
  const { openDropdown } = useFileActions();

  useEffect(() => {
    getDashboardData();
    getRecentFiles();
  }, [getDashboardData, getRecentFiles]);

  const storageStats = useMemo(() => {
    const totalMB = 500;
    const usedBytes = dashboardData?.totalStorage || 0;
    const usedMB = usedBytes / (1024 * 1024);
    const leftBytes = Math.max((totalMB * 1024 * 1024) - usedBytes, 0);
    const percentage = Math.min(Math.round((usedMB / totalMB) * 100), 100);
    
    return {
      used: formatBytes(usedBytes),
      total: '500 MB',
      left: formatBytes(leftBytes),
      percentage
    };
  }, [dashboardData]);

  const folderCategories = useMemo(() => {
    const categories = [
      { id: 'document', title: 'Documents', key: 'Documents', color: '#56B8FF', type: 'documents' },
      { id: 'image', title: 'Images', key: 'Images', color: '#FA7275', type: 'images' },
      { id: 'media', title: 'Media', key: 'Video', color: '#FDAB5C', type: 'video' },
      { id: 'others', title: 'Others', key: 'Others', color: '#8C7CF0', type: 'others' }
    ];

    return categories.map(cat => {
      const stat = dashboardData?.stats?.find(s => s._id === cat.key);
      return {
        ...cat,
        size: formatBytes(stat?.totalSize || 0),
        lastUpdateTime: stat?.lastUpdate ? formatTimeAgo(stat.lastUpdate) : 'No files'
      };
    });
  }, [dashboardData]);

  return (
    <div className="w-full font-['Poppins',sans-serif]">
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

      <div className="max-w-[1100px] mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/5 p-4 sm:p-10 border border-white/40">
        <div className="flex gap-10 flex-col lg:flex-row">

          <div className="flex-1">
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 hover:scale-[1.02] cursor-pointer animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
              }}
            >
              <div className="relative">
                <StorageRing percentage={storageStats.percentage} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">{storageStats.percentage}%</span>
                  <span className="text-xs opacity-80">Space used</span>
                </div>
              </div>

              <div className="text-white text-center sm:text-left">
                <h2 className="text-xl font-semibold mb-1">Available Storage</h2>
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                  <p className="text-base font-medium opacity-95">
                    Used: {storageStats.used} / {storageStats.total}
                  </p>
                  <p className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-lg w-fit">
                    Left: {storageStats.left}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {folderCategories.map((folder) => (
                <Dashboardbox
                  key={folder.id}
                  title={folder.title}
                  size={folder.size}
                  lastUpdateTime={folder.lastUpdateTime}
                  iconColor={folder.color}
                  iconType={folder.type}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[380px]">
            <h2 className="text-xl font-bold text-[#333F4E] mb-6 animate-fade-in-right">
              Recent files uploaded
            </h2>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {recentFiles.length > 0 ? (
                recentFiles.map((file, index) => (
                  <div
                    key={file._id}
                    className="flex items-center gap-4 group rounded-xl px-3 py-2 transition-all duration-200 hover:bg-[#F2F4F8]/80 hover:shadow-sm cursor-pointer animate-fade-in-right"
                    style={{ animationDelay: `${index * 60}ms` }}
                    onClick={() => {
                      if (!file.url) return;
                      const ext = file.name.split('.').pop().toLowerCase();
                      const docs = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'];
                      if (docs.includes(ext)) {
                        window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true`, '_blank');
                      } else {
                        window.open(file.url, '_blank');
                      }
                    }}
                  >
                    <FileIcon 
                      color={
                        (() => {
                          const ext = file.name.split('.').pop().toLowerCase();
                          if (['pdf'].includes(ext)) return '#E74C3C';
                          if (['xls', 'xlsx', 'csv'].includes(ext)) return '#27AE60';
                          if (['ppt', 'pptx'].includes(ext)) return '#E67E22';
                          if (['zip', 'rar', '7z'].includes(ext)) return '#F1C40F';
                          if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) return '#F7DF1E';
                          if (['py'].includes(ext)) return '#3776AB';
                          if (['html'].includes(ext)) return '#E34F26';
                          if (['css'].includes(ext)) return '#1572B6';
                          if (['json'].includes(ext)) return '#000000';
                          if (file.type.startsWith('image')) return '#FA7275';
                          if (file.type.startsWith('video') || file.type.startsWith('audio')) return '#FDAB5C';
                          return '#3B48A3';
                        })()
                      } 
                      ext={file.name.split('.').pop()}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-[#333F4E] text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-[#A3B2C7] text-xs">
                        {formatTimeAgo(file.createdAt)}
                      </p>
                    </div>

                    <button 
                      className="flex flex-col gap-[3px] p-1 opacity-40 hover:opacity-70 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        openDropdown({
                          id: file._id,
                          name: file.name,
                          size: formatBytes(file.size),
                          time: formatTimeAgo(file.createdAt),
                          type: file.type,
                          permissions: file.permissions
                        }, rect);
                      }}
                    >
                      <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
                      <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
                      <span className="w-[4px] h-[4px] rounded-full bg-[#333F4E]" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 font-medium">
                  No recent files
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
