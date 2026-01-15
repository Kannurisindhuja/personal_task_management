import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRequestToken = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { username }
      )
      setToken(res.data.resetToken)
      setMessage('Reset token generated. Enter a new password below.')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request password reset')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        resetToken: token,
        newPassword,
      })

      setMessage('Password updated successfully! Please login.')
      setUsername('')
      setToken('')
      setNewPassword('')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password')
    }
  }

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {!token ? (
        <form onSubmit={handleRequestToken}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Request Reset Token</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input type="text" value={token} readOnly />

          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              }}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          <button type="submit" disabled={!newPassword}>
            Reset Password
          </button>
        </form>
      )}

      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
