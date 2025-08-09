import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateListTitle } from '../../Redux/slices/board/Board'

export default function RenameTaskListModal ({ toggleModal, task }) {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState(task.title)

  const handleRename = () => {
    if (!newTitle.trim()) {
      alert('Please enter a valid title')
      return
    }
    dispatch(
      updateListTitle({ boardId: task.boardId, listId: task.id, newTitle })
    )
    toggleModal()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-90 bg-black/30 backdrop-blur-xs z-50'>
      <div className='bg-white text-black p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Rename Task List</h2>
        <input
          type='text'
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder='New list title'
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        <div className='flex justify-end gap-2'>
          <button
            onClick={toggleModal}
            className='bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={handleRename}
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  )
}
