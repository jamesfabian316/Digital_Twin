import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/')
  }

  return (
    <Routes>
      <Route
        path='/login'
        element={<Login onLogin={handleLogin} />}
      />
      <Route
        path='/'
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate
              to='/login'
              replace
            />
          )
        }
      />
    </Routes>
  )
}

export default App
