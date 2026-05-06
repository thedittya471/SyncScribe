import React, { useEffect, useMemo, useState } from 'react'
import FileCard from '../components/FileCard'
import { useFiles } from '../context/FileContext'
import { formatBytes } from '../utils/format'
import { useFileSort } from '../hooks/useFileSort'
import { Users, UserPlus } from 'lucide-react'

const Shared = () => {
    const [activeTab, setActiveTab] = useState('withMe');
    const { files, getSharedFiles, getSharedByMeFiles, loading } = useFiles();
    const { sortedFiles, sortBy, setSortBy, sortOptions } = useFileSort(files);

    useEffect(() => {
        if (activeTab === 'withMe') {
            getSharedFiles();
        } else {
            getSharedByMeFiles();
        }
    }, [activeTab, getSharedFiles, getSharedByMeFiles]);

    const totalSize = useMemo(() => {
        const total = files.reduce((acc, file) => acc + (file.size || 0), 0);
        return formatBytes(total);
    }, [files]);

    return (
        <div className="w-full font-['Poppins',sans-serif]">
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fadeInUp 0.4s ease-out both; }
      `}</style>

            <div className="max-w-[1100px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-[#333F4E] text-4xl font-extrabold mb-1 anim-fade-up">
                        {activeTab === 'withMe' ? 'Shared with me' : 'Shared by me'}
                    </h1>
                    
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex bg-[#F2F4F8] p-1 rounded-2xl anim-fade-up" style={{ animationDelay: '40ms' }}>
                            <button
                                onClick={() => setActiveTab('withMe')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activeTab === 'withMe' 
                                    ? 'bg-white text-[#FA7275] shadow-sm' 
                                    : 'text-[#A3B2C7] hover:text-[#333F4E]'
                                }`}
                            >
                                Shared with me
                            </button>
                            <button
                                onClick={() => setActiveTab('byMe')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activeTab === 'byMe' 
                                    ? 'bg-white text-[#FA7275] shadow-sm' 
                                    : 'text-[#A3B2C7] hover:text-[#333F4E]'
                                }`}
                            >
                                Shared by me
                            </button>
                        </div>

                        <div className="flex items-center gap-6 anim-fade-up" style={{ animationDelay: '80ms' }}>
                            <p className="text-[#333F4E]/60 text-sm">
                                Total: <span className="font-bold text-[#333F4E]">{totalSize}</span>
                            </p>

                            <div className="flex items-center gap-3">
                                <span className="text-[#333F4E]/40 text-[13px] font-medium">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-[#E2E8F0] text-[#333F4E] text-[13px] font-semibold py-1.5 px-3 rounded-lg outline-none focus:ring-2 focus:ring-[#FA7275]/20 transition-all cursor-pointer hover:border-[#CBD5E1]"
                                >
                                    {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 anim-fade-up">
                        <div className="w-10 h-10 border-4 border-[#FA7275]/20 border-t-[#FA7275] rounded-full animate-spin"></div>
                        <p className="text-[#A3B2C7] font-medium tracking-wide">
                            {activeTab === 'withMe' ? 'Fetching shared files...' : 'Loading your shared items...'}
                        </p>
                    </div>
                ) : sortedFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 justify-items-center">
                        {sortedFiles.map((file, idx) => (
                            <div
                                key={file._id}
                                className="anim-fade-up"
                                style={{ animationDelay: `${idx * 40}ms` }}
                            >
                                <FileCard
                                    id={file._id}
                                    fileName={file.name}
                                    fileSize={formatBytes(file.size)}
                                    timestamp={new Date(file.createdAt).toLocaleDateString()}
                                    fileType={file.type}
                                    fileUrl={file.url}
                                    owner={file.owner}
                                    permissions={file.permissions}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center anim-fade-up">
                        <div className="w-20 h-20 bg-[#F2F4F8] rounded-full flex items-center justify-center mb-5">
                            {activeTab === 'withMe' ? (
                                <Users size={32} className="text-[#A3B2C7]" strokeWidth={1.5} />
                            ) : (
                                <UserPlus size={32} className="text-[#A3B2C7]" strokeWidth={1.5} />
                            )}
                        </div>
                        <h3 className="text-[#333F4E] text-xl font-bold mb-2">
                            {activeTab === 'withMe' ? 'No shared files' : 'You haven\'t shared anything'}
                        </h3>
                        <p className="text-[#A3B2C7] max-w-[280px]">
                            {activeTab === 'withMe' 
                                ? 'Files shared with you by others will appear here.'
                                : 'Start sharing files with others to see them here.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shared;
