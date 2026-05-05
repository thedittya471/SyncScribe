import React, { createContext, useContext, useState, useCallback } from 'react'
import FileActionDropdown from '../components/FileActionDropdown'
import RenameModal from '../components/RenameModal'
import TrashModal from '../components/TrashModal'
import DetailsModal from '../components/DetailsModal'
import ShareModal from '../components/ShareModal'
import { useFiles } from './FileContext'

const FileActionContext = createContext()

export const FileActionProvider = ({ children }) => {
  const [activeFile, setActiveFile] = useState(null) // { id, name, rect, type, size, time }
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [modalFileData, setModalFileData] = useState(null)

  const openDropdown = useCallback((fileData, rect) => {
    setActiveFile({ ...fileData, rect })
  }, [])

  const closeDropdown = useCallback(() => {
    setActiveFile(null)
  }, [])

  const openRenameModal = useCallback((fileData) => {
    setModalFileData(fileData)
    setIsRenameModalOpen(true)
    closeDropdown()
  }, [closeDropdown])

  const closeRenameModal = useCallback(() => {
    setIsRenameModalOpen(false)
    setModalFileData(null)
  }, [])

  const openTrashModal = useCallback((fileData) => {
    setModalFileData(fileData)
    setIsTrashModalOpen(true)
    closeDropdown()
  }, [closeDropdown])

  const closeTrashModal = useCallback(() => {
    setIsTrashModalOpen(false)
    setModalFileData(null)
  }, [])

  const openDetailsModal = useCallback((fileData) => {
    setModalFileData(fileData)
    setIsDetailsModalOpen(true)
    closeDropdown()
  }, [closeDropdown])

  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false)
    setModalFileData(null)
  }, [])

  const openShareModal = useCallback((fileData) => {
    setModalFileData(fileData)
    setIsShareModalOpen(true)
    closeDropdown()
  }, [closeDropdown])

  const closeShareModal = useCallback(() => {
    setIsShareModalOpen(false)
    setModalFileData(null)
  }, [])

  const { renameFile, moveToTrash, downloadFile } = useFiles();

  const handleRenameSave = async (newName) => {
    try {
      await renameFile(modalFileData.id, newName);
      closeRenameModal();
    } catch (error) {
      alert(error.message || 'Rename failed');
    }
  }

  const handleMoveToTrash = async () => {
    try {
      await moveToTrash(modalFileData.id);
      closeTrashModal();
    } catch (error) {
      alert(error.message || 'Move to trash failed');
    }
  }

  const handleDownload = async (fileId) => {
    try {
      await downloadFile(fileId);
      closeDropdown();
    } catch (error) {
      alert(error.message || 'Download failed');
    }
  };

  return (
    <FileActionContext.Provider value={{ 
      activeFile, 
      openDropdown, 
      closeDropdown,
      openRenameModal,
      closeRenameModal,
      openTrashModal,
      closeTrashModal,
      openDetailsModal,
      closeDetailsModal,
      openShareModal,
      closeShareModal,
      isRenameModalOpen,
      isTrashModalOpen,
      isDetailsModalOpen,
      isShareModalOpen
    }}>
      {children}
      {activeFile && (
        <>
          <div className="fixed inset-0 z-[999] bg-transparent" onClick={closeDropdown} />
          <FileActionDropdown 
            id={activeFile.id}
            fileName={activeFile.name} 
            rect={activeFile.rect} 
            onClose={closeDropdown} 
            onRename={() => openRenameModal(activeFile)}
            onMoveToTrash={() => openTrashModal(activeFile)}
            onShowDetails={() => openDetailsModal(activeFile)}
            onShare={() => openShareModal(activeFile)}
            onDownload={() => handleDownload(activeFile.id)}
          />
        </>
      )}
      {isRenameModalOpen && (
        <RenameModal 
          fileName={modalFileData.name}
          onClose={closeRenameModal}
          onSave={handleRenameSave}
        />
      )}
      {isTrashModalOpen && (
        <TrashModal 
          fileName={modalFileData.name}
          onClose={closeTrashModal}
          onConfirm={handleMoveToTrash}
        />
      )}
      {isDetailsModalOpen && (
        <DetailsModal 
          fileData={{
            fileName: modalFileData.name,
            fileSize: modalFileData.size,
            timestamp: modalFileData.time,
            fileType: modalFileData.type
          }}
          onClose={closeDetailsModal}
        />
      )}
      {isShareModalOpen && (
        <ShareModal 
          fileData={{
            fileName: modalFileData.name,
            fileSize: modalFileData.size,
            timestamp: modalFileData.time,
            fileType: modalFileData.type
          }}
          onClose={closeShareModal}
        />
      )}
    </FileActionContext.Provider>
  )
}

export const useFileActions = () => {
  const context = useContext(FileActionContext)
  if (!context) {
    throw new Error('useFileActions must be used within a FileActionProvider')
  }
  return context
}
