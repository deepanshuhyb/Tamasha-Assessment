import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, deleteList, deleteTask } from '../Redux/slices/board/Board'

export default function TaskList ({ list, boardId }) {
  const dispatch = useDispatch()
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title')
      return
    }
    dispatch(createTask({ boardId, listId: list.id, title: newTaskTitle }))
    setNewTaskTitle('')
  }
  const handleDeleteList = listId => {
    dispatch(deleteList({ boardId, listId }))
  }

  return (
    <div className='bg-gray-800 rounded-lg p-4 border border-gray-600'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold mb-2 text-white'>{list.title}</h3>
        <button
          className='text-red-400 hover:text-red-600'
          onClick={() => handleDeleteList(list.id)}
        >
          ✕
        </button>
      </div>

      <ul className='space-y-2 mb-3 min-h-[50px]'>
        {list.items.map(task => (
          <li
            key={task.id}
            className='bg-gray-700 p-2 rounded flex justify-between items-center text-white border border-gray-600'
          >
            <span>{task.title}</span>
            <button
              onClick={() =>
                dispatch(
                  deleteTask({
                    boardId,
                    listId: list.id,
                    taskId: task.id
                  })
                )
              }
              className='text-red-400 hover:text-red-600'
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <input
        type='text'
        value={newTaskTitle}
        onChange={e => setNewTaskTitle(e.target.value)}
        placeholder='New task title'
        className='border border-gray-600 p-2 w-full mb-2 bg-gray-700 text-white placeholder-gray-400'
      />
      <button
        className='bg-green-600 text-white w-full p-2 rounded hover:bg-green-700'
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  )
}
