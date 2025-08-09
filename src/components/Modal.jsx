import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBoard } from '../Redux/slices/board/Board'
export default function Modal ({ toggleModal }) {
  const [boardName, setBoardName] = useState('')
  const defaultList = [
    { id: 1, title: 'To Do', items: [] },
    { id: 2, title: 'In Progress', items: [] },
    { id: 3, title: 'Done', items: [] }
  ]
  const dispatch = useDispatch()
  const Boards = useSelector(state => state.board.boards)

  function handleAddBoard () {
    if (!boardName) {
      alert('Please enter a board name')
      return
    }
    // add logic to check if board already exists
    dispatch(addBoard(boardName))

    toggleModal()
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-90 bg-black/30 backdrop-blur-xs z-50'>
      <div className='bg-white text-black p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Enter Board Name</h2>

        <input
          type='text'
          value={boardName}
          onChange={e => setBoardName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
          placeholder='Board Name'
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
            onClick={handleAddBoard}
          >
            Add Board
          </button>
        </div>
      </div>
    </div>
  )
}
