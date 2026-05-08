import React, { useEffect, useState, useMemo } from 'react'
import FileCard from '../components/FileCard'
import { useFiles } from '../context/FileContext'
import { formatBytes } from '../utils/format'

import { useFileSort } from '../hooks/useFileSort'

const ImagePage = () => {
    const { files, getFiles, loading } = useFiles();
    const { sortedFiles, sortBy, setSortBy, sortOptions } = useFileSort(files);

    useEffect(() => {
        getFiles('Images');
    }, [getFiles]);

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
                    <h1 className="text-[#333F4E] text-3xl sm:text-4xl font-extrabold mb-1 anim-fade-up">
                        Images
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                        <p className="text-[#333F4E]/60 text-sm anim-fade-up" style={{ animationDelay: '60ms' }}>
                            Total: <span className="font-semibold">{totalSize}</span>
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

                {loading && files.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#FA7275]/20 border-t-[#FA7275] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedFiles.length > 0 ? (
                            sortedFiles.map((img, index) => (
                                <div
                                    key={img._id}
                                    className="anim-fade-up"
                                    style={{ animationDelay: `${150 + index * 50}ms` }}
                                >
                                    <FileCard
                                        id={img._id}
                                        fileName={img.name}
                                        fileSize={formatBytes(img.size)}
                                        timestamp={new Date(img.createdAt).toLocaleDateString()}
                                        fileType="image"
                                        fileUrl={img.url}
                                        permissions={img.permissions}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-400 font-medium">
                                No images found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImagePage
