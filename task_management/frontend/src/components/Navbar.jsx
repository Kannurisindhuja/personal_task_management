function Navbar({ token, onLogout }) {
  if (!token) return null 

  return (
    <>
    
    <nav className="navbar">
      <h1>Task Management</h1>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </nav>
    </>
  )
}

export default Navbar
