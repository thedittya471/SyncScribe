import React, { useEffect, useState } from 'react'
import ImageBox from '../components/ImageBox'

const imageFiles = [
    { id: 1, fileName: 'App School.png', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/20/200' },
    { id: 2, fileName: 'BC company.jpeg', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/36/200' },
    { id: 3, fileName: 'B.UI.jpeg', fileSize: '15 MB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/11/200' },
    { id: 4, fileName: 'CompanyANV.jpeg', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/48/200' },
    { id: 5, fileName: 'company ABC.jpeg', fileSize: '6 MB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/60/200' },
    { id: 6, fileName: 'My CV.png', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/42/200' },
    { id: 7, fileName: 'My Jobs.jpeg', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/55/200' },
    { id: 8, fileName: 'Photoshop.png', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/10/200' },
    { id: 9, fileName: 'P.N design123.jpeg', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/33/200' },
    { id: 10, fileName: 'system.png', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/22/200' },
    { id: 11, fileName: 'school.png', fileSize: '15 MB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/111/200' },
    { id: 12, fileName: 'Water design999.jpeg', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', imageUrl: 'https://picsum.photos/id/44/200' },
]

const sortOptions = [
    'Date Created (newest)',
    'Date Created (oldest)',
    'Name (A-Z)',
    'Name (Z-A)',
    'Size (largest)',
    'Size (smallest)',
]

const ImagePage = () => {
    const [sortBy, setSortBy] = useState(sortOptions[0])

    // Load Poppins font
    useEffect(() => {
        if (!document.querySelector('link[href*="Poppins"]')) {
            const link = document.createElement('link')
            link.href =
                'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
            link.rel = 'stylesheet'
            document.head.appendChild(link)
        }
    }, [])

    return (
        <div className="w-full font-['Poppins',sans-serif]">
            {/* Animations */}
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fadeInUp 0.4s ease-out both; }
      `}</style>

            <div className="max-w-[1100px] mx-auto">
                {/* ── Header row ── */}
                <div className="mb-8">
                    <h1 className="text-[#333F4E] text-4xl font-extrabold mb-1 anim-fade-up">
                        Images
                    </h1>
                    <div className="flex items-center justify-between">
                        <p className="text-[#333F4E]/60 text-sm anim-fade-up" style={{ animationDelay: '60ms' }}>
                            Total: <span className="font-semibold">12GB</span>
                        </p>

                        {/* Sort dropdown */}
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

                {/* ── Image grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-3 justify-items-center">
                    {imageFiles.map((img, index) => (
                        <div
                            key={img.id}
                            className="anim-fade-up"
                            style={{ animationDelay: `${150 + index * 50}ms` }}
                        >
                            <ImageBox
                                fileName={img.fileName}
                                fileSize={img.fileSize}
                                timestamp={img.timestamp}
                                imageUrl={img.imageUrl}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImagePage
