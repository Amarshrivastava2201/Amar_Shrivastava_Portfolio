import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Certifications from './pages/Certifications'
import ProtectedRoute from './routes/ProtectedRoute'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

useEffect(() => {
  const path = location.pathname

  const titles = {
    '/': 'Amar Shrivastava | Full Stack Developer',
    '/projects': 'Projects | Amar Shrivastava',
    '/certifications': 'Certifications | Amar Shrivastava',
    '/contact': 'Contact | Amar Shrivastava',
    '/admin/login': 'Admin Login',
    '/admin/dashboard': 'Admin Dashboard'
  }

  document.title = titles[path] || 'Amar Shrivastava'
}, [location])
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </MainLayout>
  )
}

export default App