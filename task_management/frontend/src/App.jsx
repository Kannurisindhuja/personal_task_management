import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import TaskList from './components/TaskList.jsx'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const handleLogout = () => {
    setToken(null)
  }

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/tasks" /> : <Login setToken={setToken} />}
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/tasks" /> : <Register />}
          />

          <Route
            path="/forgot-password"
            element={token ? <Navigate to="/tasks" /> : <ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={token ? <Navigate to="/tasks" /> : <ResetPassword />}
          />

          <Route
            path="/tasks"
            element={token ? <TaskList token={token} /> : <Navigate to="/login" />}
          />

          <Route path="/" element={<Navigate to={token ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
