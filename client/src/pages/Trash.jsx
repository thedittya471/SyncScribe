import React, { useEffect, useState } from 'react'
import TrashBox from '../components/TrashBox'
import { trashFiles } from '../data'
import { Trash2 } from 'lucide-react'

const sortOptions = [
    'Date Created (newest)',
    'Date Created (oldest)',
    'Name (A-Z)',
    'Name (Z-A)',
    'Size (largest)',
    'Size (smallest)',
]

const Trash = () => {
    const [sortBy, setSortBy] = useState(sortOptions[0])

    useEffect(() => {
        if (!document.querySelector('link[href*="Poppins"]')) {
            const link = document.createElement('link')
            link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
            link.rel = 'stylesheet'
            document.head.appendChild(link)
        }
    }, [])

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
                        Trash
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 anim-fade-up" style={{ animationDelay: '60ms' }}>
                            <p className="text-[#333F4E]/60 text-sm">
                                Total: <span className="font-semibold">{trashFiles.length} items</span>
                            </p>
                            {trashFiles.length > 0 && (
                                <button className="flex items-center gap-2 bg-[#FA7275] hover:bg-[#F95F63] text-white px-5 py-2 rounded-full text-xs font-bold shadow-[0_4px_15px_rgba(250,114,117,0.25)] hover:shadow-[0_4px_20px_rgba(250,114,117,0.35)] hover:-translate-y-0.5 transition-all duration-300">
                                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                                    <span>Empty Trash</span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 anim-fade-up" style={{ animationDelay: '120ms' }}>
                            <span className="text-[#A3B2C7] text-sm">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-[#333F4E] text-sm font-medium cursor-pointer outline-none appearance-none pr-5"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23333F4E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right center',
                                }}
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {trashFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-3 justify-items-center">
                        {trashFiles.map((file, index) => (
                            <div
                                key={file.id}
                                className="anim-fade-up"
                                style={{ animationDelay: `${150 + index * 50}ms` }}
                            >
                                <TrashBox
                                    fileName={file.fileName}
                                    fileSize={file.fileSize}
                                    timestamp={file.timestamp}
                                    fileType={file.fileType}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 anim-fade-up">
                        <div className="w-24 h-24 bg-[#F2F4F8] rounded-full flex items-center justify-center mb-6">
                            <Trash2 size={40} className="text-[#A3B2C7]" strokeWidth={1.5} />
                        </div>
                        <p className="text-[#333F4E] text-xl font-bold mb-2">Trash is empty</p>
                        <p className="text-[#A3B2C7] text-sm">Items moved to trash will appear here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Trash
