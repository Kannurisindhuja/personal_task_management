import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './TaskForm.jsx'

function TaskList({ token }) {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const res = await axios.get('http://localhost:5000/api/tasks', config)
      setTasks(res.data)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      alert('Could not load tasks. Please login again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchTasks()
  }, [token])

  const handleTaskAdded = () => {
    fetchTasks()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } }
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config)
      fetchTasks()
    } catch {
      alert('Failed to delete task')
    }
  }

  if (loading) return <p>Loading tasks...</p>

  return (
    <div className="task-container">
      <TaskForm
        token={token}
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <>
          <h2 className="task-heading">My Tasks:</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task._id} className="task">
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-actions">
                    <button onClick={() => setEditingTask(task)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>
                </div>
                {task.description && <p className="task-desc">{task.description}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TaskList
