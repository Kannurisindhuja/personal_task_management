import { useState, useEffect } from 'react'
import axios from 'axios'

function TaskForm({ token, onTaskAdded, editingTask, setEditingTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description || '')
    }
  }, [editingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          { title, description },
          config
        )
        setEditingTask(null)
      } else {
        await axios.post(
          'http://localhost:5000/api/tasks',
          { title, description },
          config
        )
      }

      setTitle('')
      setDescription('')
      onTaskAdded() // 🔥 THIS refreshes the list
    } catch (err) {
      console.error(err)
      alert('Failed to add task')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
