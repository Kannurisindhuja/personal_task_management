import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      })
      setToken(res.data.token)
      navigate('/tasks')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <h2 className="credential-heading">Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="links-accounts">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p className="links-accounts">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
