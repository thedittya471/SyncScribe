import React, { useEffect, useState } from 'react'
import MediaBox from '../components/MediaBox'
import { otherFiles } from '../data'

const sortOptions = [
    'Date Created (newest)',
    'Date Created (oldest)',
    'Name (A-Z)',
    'Name (Z-A)',
    'Size (largest)',
    'Size (smallest)',
]

const Others = () => {
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
                        Others
                    </h1>
                    <div className="flex items-center justify-between">
                        <p className="text-[#333F4E]/60 text-sm anim-fade-up" style={{ animationDelay: '60ms' }}>
                            Total: <span className="font-semibold">12 GB</span>
                        </p>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-3 justify-items-center">
                    {otherFiles.map((file, index) => (
                        <div
                            key={file.id}
                            className="anim-fade-up"
                            style={{ animationDelay: `${150 + index * 50}ms` }}
                        >
                            <MediaBox
                                fileName={file.fileName}
                                fileSize={file.fileSize}
                                timestamp={file.timestamp}
                                fileType={file.fileType}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Others
