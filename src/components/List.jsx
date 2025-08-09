import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createList } from '../Redux/slices/board/Board'

export default function List () {
  const [listTitle, setListTitle] = useState('')
  const dispatch = useDispatch()
  const activeBoard = useSelector(state => state.board.activeBoard)

  function handleAddList () {
    if (!listTitle.trim()) {
      alert('Please enter a list title')
      return
    }
    if (activeBoard) {
      dispatch(createList({ boardId: activeBoard.id, listTitle }))
      setListTitle('')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <input
        type='text'
        value={listTitle}
        onChange={e => setListTitle(e.target.value)}
        className='p-2 border border-gray-300 rounded-md mb-2'
        placeholder='New List Title'
      />
      <button
        className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
        onClick={handleAddList}
      >
        Add List
      </button>
    </div>
  )
}
