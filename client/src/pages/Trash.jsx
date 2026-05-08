import React, { useEffect, useState, useMemo } from 'react'
import FileCard from '../components/FileCard'
import { useFiles } from '../context/FileContext'
import { formatBytes } from '../utils/format'
import { Trash2 } from 'lucide-react'

import { useFileSort } from '../hooks/useFileSort'

const Trash = () => {
    const { files, getFiles, loading, restoreFromTrash, deletePermanently } = useFiles();
    const { sortedFiles, sortBy, setSortBy, sortOptions } = useFileSort(files);

    useEffect(() => {
        getFiles('trash');
    }, [getFiles]);

    const handleRestore = async (id) => {
        await restoreFromTrash(id);
        getFiles('trash');
    };

    const handleDelete = async (id) => {
        await deletePermanently(id);
    };

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
                        Trash
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-4 anim-fade-up" style={{ animationDelay: '60ms' }}>
                            <p className="text-[#333F4E]/60 text-sm">
                                Total: <span className="font-semibold">{files.length} items</span>
                            </p>
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

                {loading && files.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#FA7275]/20 border-t-[#FA7275] rounded-full animate-spin"></div>
                    </div>
                ) : files.length > 0 ? (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedFiles.map((file, index) => (
                            <div
                                key={file._id}
                                className="anim-fade-up"
                                style={{ animationDelay: `${150 + index * 50}ms` }}
                            >
                                <FileCard
                                    id={file._id}
                                    fileName={file.name}
                                    fileSize={formatBytes(file.size)}
                                    timestamp={new Date(file.createdAt).toLocaleDateString()}
                                    fileType={file.type}
                                    isTrashed={true}
                                    onRestore={() => handleRestore(file._id)}
                                    onDelete={() => handleDelete(file._id)}
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
