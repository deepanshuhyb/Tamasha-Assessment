import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../Redux/slices/board/Board'
export default function EditTaskModal ({ toggleModal, boardId, task }) {
  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(task.title || '')
  const [taskDescription, setTaskDescription] = useState(task.description || '')

  const handleEditTask = () => {
    if (!taskTitle.trim()) {
      alert('Please enter a task title')
      return
    }
    dispatch(
      updateTask({
        boardId,
        taskId: task.id,
        title: taskTitle.trim(),
        description: taskDescription.trim()
      })
    )
    toggleModal()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50'>
      <div className='bg-white text-black p-6 rounded-lg shadow-lg w-1/3 max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Edit Task</h2>

        <input
          type='text'
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder='Task Title (required)'
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        <textarea
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
          placeholder='Description (optional)'
          className='w-full p-2 border border-gray-300 rounded-md mb-4 resize-none'
          rows={4}
        />

        <div className='flex justify-end gap-2'>
          <button
            className='bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400'
            onClick={() => toggleModal()}
          >
            Cancel
          </button>
          <button
            className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'
            onClick={handleEditTask}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
