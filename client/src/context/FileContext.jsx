import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api';
import Notification from '../components/Notification';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [notification, setNotification] = useState({ visible: false, type: '', message: '' });

  const showNotification = (type, message, duration = 3000) => {
    setNotification({ visible: true, type, message });
    if (type !== 'loading') {
      setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), duration);
    }
  };

  const hideNotification = () => setNotification(prev => ({ ...prev, visible: false }));

  const getDashboardData = useCallback(async () => {
    try {
      const response = await api.get('/files/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  const getRecentFiles = useCallback(async () => {
    try {
      const response = await api.get('/files/recent');
      setRecentFiles(response.data.data);
    } catch (error) {
      console.error('Error fetching recent files:', error);
    }
  }, []);

  const getFiles = useCallback(async (category = 'all', searchTerm = '') => {
    setLoading(true);
    try {
      const endpoint = category === 'trash' ? '/files/trashed' : '/files';
      const response = await api.get(endpoint, {
        params: { category, search: searchTerm }
      });
      setFiles(response.data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFile = async (file) => {
    showNotification('loading', 'Uploading file...');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFiles(prev => [response.data.data, ...prev]);
      getDashboardData();
      getRecentFiles();
      showNotification('success', 'File uploaded successfully!');
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Upload failed';
      showNotification('error', msg);
      throw error.response?.data || error.message;
    }
  };

  const renameFile = async (fileId, newName) => {
    try {
      const response = await api.patch(`/files/rename/${fileId}`, { newName });
      setFiles(prev => prev.map(f => f._id === fileId ? { ...f, name: newName } : f));
      getDashboardData();
      getRecentFiles();
      showNotification('success', 'File renamed successfully');
      return response.data;
    } catch (error) {
      showNotification('error', 'Failed to rename file');
      throw error.response?.data || error.message;
    }
  };

  const moveToTrash = async (fileId) => {
    try {
      await api.patch(`/files/trash/${fileId}`);
      setFiles(prev => prev.filter(f => f._id !== fileId));
      getDashboardData();
      getRecentFiles();
      showNotification('success', 'Moved to trash');
    } catch (error) {
      showNotification('error', 'Failed to move to trash');
      throw error.response?.data || error.message;
    }
  };

  const deletePermanently = async (fileId) => {
    try {
      await api.delete(`/files/delete/${fileId}`);
      setFiles(prev => prev.filter(f => f._id !== fileId));
      getDashboardData();
      getRecentFiles();
      showNotification('success', 'Deleted permanently');
    } catch (error) {
      showNotification('error', 'Failed to delete file');
      throw error.response?.data || error.message;
    }
  };

  const restoreFromTrash = async (fileId) => {
    try {
      await api.patch(`/files/restore/${fileId}`);
      showNotification('success', 'File restored successfully');
    } catch (error) {
      showNotification('error', 'Failed to restore file');
      throw error.response?.data || error.message;
    }
  };

  const downloadFile = async (fileId) => {
    try {
      showNotification('loading', 'Preparing download...');
      const response = await api.get(`/files/download/${fileId}`);
      const { downloadUrl } = response.data.data;
      window.open(downloadUrl, "_blank");
      hideNotification();
    } catch (error) {
      showNotification('error', 'Download failed');
      throw error.response?.data || error.message;
    }
  };

  const shareFile = async (fileId, email, role = 'viewer') => {
    try {
      showNotification('loading', 'Sharing file...');
      const response = await api.patch(`/files/share/${fileId}`, { email, role });
      const updatedFile = response.data.data;

      setFiles(prev => prev.map(file => file._id === fileId ? updatedFile : file));
      showNotification('success', `File shared with ${email}`);
      return updatedFile;
    } catch (error) {
      const msg = error.response?.data?.message || 'Sharing failed';
      showNotification('error', msg);
      throw error.response?.data || error.message;
    }
  };

  const revokeShareAccess = async (fileId, userId) => {
    try {
      showNotification('loading', 'Revoking access...');
      const response = await api.patch(`/files/revoke/${fileId}`, { userId });
      const updatedFile = response.data.data;

      setFiles(prev => prev.map(file => file._id === fileId ? updatedFile : file));
      showNotification('success', 'Access revoked successfully');
      return updatedFile;
    } catch (error) {
      const msg = error.response?.data?.message || 'Revocation failed';
      showNotification('error', msg);
      throw error.response?.data || error.message;
    }
  };

  const getSharedFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/files/shared-with-me');
      setFiles(response.data.data);
    } catch (error) {
      console.error('Error fetching shared files:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSharedByMeFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/files/shared-by-me');
      setFiles(response.data.data);
    } catch (error) {
      console.error('Error fetching shared by me files:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchGlobalFiles = async (query) => {
    try {
      const { data } = await api.get(`/files/search?query=${query}`);
      return data.data;
    } catch (error) {
      console.error("Global search error:", error);
      return [];
    }
  };

  return (
    <FileContext.Provider value={{
      files,
      loading,
      dashboardData,
      getDashboardData,
      getRecentFiles,
      recentFiles,
      getFiles,
      uploadFile,
      renameFile,
      moveToTrash,
      deletePermanently,
      restoreFromTrash,
      downloadFile,
      shareFile,
      revokeShareAccess,
      getSharedFiles,
      getSharedByMeFiles,
      searchGlobalFiles,
      searchTerm,
      setSearchTerm
    }}>
      {children}
      <Notification {...notification} />
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
