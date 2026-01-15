import { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        { resetToken, newPassword }
      );
      setMessage('Password updated successfully');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Reset failed');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <textarea
          placeholder="Reset Token"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
