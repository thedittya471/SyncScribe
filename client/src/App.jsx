import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DocumentPage from './pages/Document'
import ImagePage from './pages/Image'
import MediaPage from './pages/Media'
import OthersPage from './pages/Others'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/others" element={<OthersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App