import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createList, moveTask } from '../Redux/slices/board/Board'
import TaskList from './TaskList'
import Edit from '../assets/svg/Edit.svg'
import ChangeTaskModal from './Modals/RenameBoardModal'

export default function Board () {
  const dispatch = useDispatch()
  const activeBoard = useSelector(state => state.board.activeBoard)
  const [newListTitle, setNewListTitle] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setNewListTitle('')
    console.log('Active Board:', activeBoard)
  }, [activeBoard])

  const handleAddList = () => {
    if (!newListTitle.trim()) {
      alert('Please enter a list title')
      return
    }
    dispatch(createList({ boardId: activeBoard.id, listTitle: newListTitle }))
    setNewListTitle('')
  }

  return (
    <div className='flex flex-col gap-4 w-full min-h-full bg-gray-900 rounded-lg shadow-lg p-4 text-white'>
      {modalOpen && (
        <ChangeTaskModal
          toggleModal={() => setModalOpen(false)}
          task={activeBoard}
        />
      )}
      <div className='flex justify-between items-center mb-4'>
        <span className='flex items-center gap-4'>
          <h2 className='text-2xl font-bold'>{activeBoard.title}</h2>
          <img
            src={Edit}
            onClick={() => setModalOpen(true)}
            alt=''
            className='w-4 h-4'
          />
        </span>
        <div
          className={`bg-gray-800 flex gap-4 w-[50%] items-center justify-center rounded-lg p-4 border border-gray-600 transition-all duration-300`}
        >
          <input
            type='text'
            value={newListTitle}
            onChange={e => setNewListTitle(e.target.value)}
            placeholder='New list title'
            className='border border-gray-600 p-2 w-full rounded-md bg-gray-700 text-white placeholder-gray-400'
          />
          <button
            className='bg-blue-600 text-white w-[25%] p-2 rounded hover:bg-blue-700'
            onClick={handleAddList}
          >
            Add List
          </button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {activeBoard.list?.map(list => (
          <TaskList
            key={list.id}
            size={list?.size}
            list={list}
            boardId={activeBoard.id}
          />
        ))}
      </div>
    </div>
  )
}
