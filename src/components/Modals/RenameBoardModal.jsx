import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameBoard } from '../../Redux/slices/board/Board'

export default function ChangeTaskModal ({ toggleModal, task }) {
  const [taskTitle, setTaskTitle] = useState(task.title)
  const dispatch = useDispatch()

  const handleUpdateTask = () => {
    if (!taskTitle.trim()) {
      alert('Please enter a task title')
      return
    }
    dispatch(renameBoard({ boardId: task.id, newTitle: taskTitle }))
    toggleModal()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-90 bg-black/30 backdrop-blur-xs z-50'>
      <div className='bg-white text-black p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
        <input
          type='text'
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
          placeholder='Task Title'
        />
        <div className='flex justify-end gap-2'>
          <button
            className='bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400'
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
            onClick={handleUpdateTask}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  )
}
