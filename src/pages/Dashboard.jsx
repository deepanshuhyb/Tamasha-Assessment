import { useEffect, useState } from 'react'
import Board from '../components/Board'
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBoard, setActiveBoard } from '../Redux/slices/board/Board'

export default function Dashboard () {
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  const boards = useSelector(state => state.board.boards)
  const activeBoard = useSelector(state => state.board.activeBoard)
  const dispatch = useDispatch()

  const deleteBoardWithID = id => {
    dispatch(deleteBoard(id))
  }

  return (
    <div className='bg-black h-screen flex gap-4 p-4 text-white'>
      {modalOpen && <Modal toggleModal={toggleModal} />}

      <div className='w-[25%] flex flex-col'>
        <h1 className='text-2xl font-bold mb-4'>Boards</h1>

        <button
          className='bg-white border-gray-400 border-2 text-blue-700 hover:bg-white/80 cursor-pointer p-2 rounded-md self-center w-[60%] mb-4'
          onClick={() => setModalOpen(true)}
        >
          Add Board
        </button>

        <div className='flex-1 overflow-y-auto bg-gradient-to-b from-blue-300 to-white rounded-lg flex flex-col gap-4 items-center p-4 hide-scrollbar'>
          {boards?.map(board => (
            <span
              key={board.id}
              className={`p-4 relative cursor-pointer w-[80%] rounded-md ${
                activeBoard?.id === board.id ? 'bg-blue-500' : 'bg-gray-700'
              }`}
              onClick={() => dispatch(setActiveBoard(board))}
            >
              <button
                className='absolute top-0 right-0.5 cursor-pointer'
                onClick={e => {
                  e.stopPropagation()
                  deleteBoardWithID(board.id)
                }}
              >
                &#10006;
              </button>
              {board.title}
            </span>
          ))}
        </div>
      </div>

      <div className='w-[75%] overflow-auto'>
        {activeBoard ? (
          <Board />
        ) : (
          <p className='text-center text-gray-400'>No board selected</p>
        )}
      </div>
    </div>
  )
}
