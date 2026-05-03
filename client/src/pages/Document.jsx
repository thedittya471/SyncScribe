import React, { useEffect, useState } from 'react'
import DocumentBox from '../components/DocumentBox'

const documents = [
    { id: 1, fileName: 'App School.doc', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'doc' },
    { id: 2, fileName: 'BC company.sketch', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'sketch' },
    { id: 3, fileName: 'B.UI.xd', fileSize: '15 MB', timestamp: '10:09pm, 10 Oct', fileType: 'xd' },
    { id: 4, fileName: 'CompanyANV.fig', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'fig' },
    { id: 5, fileName: 'company ABC.sketch', fileSize: '6 MB', timestamp: '10:09pm, 10 Oct', fileType: 'sketch' },
    { id: 6, fileName: 'My CV.pdf', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'pdf' },
    { id: 7, fileName: 'My Jobs.csv', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'csv' },
    { id: 8, fileName: 'notes.txt', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'txt' },
    { id: 9, fileName: 'P.N design123.fig', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'fig' },
    { id: 10, fileName: 'students.docx', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'docx' },
    { id: 11, fileName: 'school.pdf', fileSize: '15 MB', timestamp: '10:09pm, 10 Oct', fileType: 'pdf' },
    { id: 12, fileName: 'Water design999.fig', fileSize: '2 GB', timestamp: '10:09pm, 10 Oct', fileType: 'fig' },
]

const sortOptions = [
    'Date Created (newest)',
    'Date Created (oldest)',
    'Name (A-Z)',
    'Name (Z-A)',
    'Size (largest)',
    'Size (smallest)',
]

const Document = () => {
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
        <div className="min-h-screen bg-[#F2F4F8] p-8 font-['Poppins',sans-serif]">
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
                        Documents
                    </h1>
                    <div className="flex items-center justify-between">
                        <p className="text-[#333F4E]/60 text-sm anim-fade-up" style={{ animationDelay: '60ms' }}>
                            Total: <span className="font-semibold">12h5GB</span>
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

                {/* ── Document grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-3 justify-items-center">
                    {documents.map((doc, index) => (
                        <div
                            key={doc.id}
                            className="anim-fade-up"
                            style={{ animationDelay: `${150 + index * 50}ms` }}
                        >
                            <DocumentBox
                                fileName={doc.fileName}
                                fileSize={doc.fileSize}
                                timestamp={doc.timestamp}
                                fileType={doc.fileType}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Document
