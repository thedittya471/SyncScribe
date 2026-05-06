import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DocumentPage from './pages/Document'
import ImagePage from './pages/Image'
import MediaPage from './pages/Media'
import OthersPage from './pages/Others'
import TrashPage from './pages/Trash'
import SharedPage from './pages/Shared'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { FileActionProvider } from './context/FileActionContext'
import { AuthProvider } from './context/AuthContext'
import { FileProvider } from './context/FileContext'

const App = () => {
  return (
    <AuthProvider>
      <FileProvider>
        <FileActionProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<Landing />} />
              
              {/* Auth Routes - Protected from logged in users */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              
              {/* Protected Application Routes */}
              <Route element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/document" element={<DocumentPage />} />
                <Route path="/image" element={<ImagePage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/others" element={<OthersPage />} />
                <Route path="/shared" element={<SharedPage />} />
                <Route path="/trash" element={<TrashPage />} />
              </Route>
              
              {/* Catch-all redirect to Landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </FileActionProvider>
      </FileProvider>
    </AuthProvider>
  )
}

export default App