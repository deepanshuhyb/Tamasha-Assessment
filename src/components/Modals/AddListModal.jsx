import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../../Redux/slices/board/Board'

export default function AddListModal ({ toggleModal, boardId, listId }) {
  const dispatch = useDispatch()
  const [listTitle, setListTitle] = useState('')
  const [listDescription, setListDescription] = useState('')

  const handleAddList = () => {
    if (!listTitle.trim()) {
      alert('Please enter a list name')
      return
    }
    dispatch(
      createTask({
        boardId,
        listId,
        title: listTitle.trim(),
        description: listDescription.trim()
      })
    )
    setListTitle('')
    setListDescription('')
    toggleModal()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50'>
      <div className='bg-white text-black p-6 rounded-lg shadow-lg w-1/3 max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Add New List</h2>

        <input
          type='text'
          value={listTitle}
          onChange={e => setListTitle(e.target.value)}
          placeholder='List Name (required)'
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        <textarea
          value={listDescription}
          onChange={e => setListDescription(e.target.value)}
          placeholder='Description (optional)'
          className='w-full p-2 border border-gray-300 rounded-md mb-4 resize-none'
          rows={4}
        />

        <div className='flex justify-end gap-2'>
          <button
            className='bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400'
            onClick={() => toggleModal}
          >
            Cancel
          </button>
          <button
            className='bg-green-600 text-white p-2 rounded-md hover:bg-green-700'
            onClick={handleAddList}
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  )
}
