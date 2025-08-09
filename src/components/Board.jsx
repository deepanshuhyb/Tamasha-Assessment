import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createList, moveTask } from '../Redux/slices/board/Board'
import TaskList from './TaskList'
import { DragDropContext } from 'react-beautiful-dnd'

export default function Board () {
  const dispatch = useDispatch()
  const activeBoard = useSelector(state => state.board.activeBoard)
  const [newListTitle, setNewListTitle] = useState('')
  const [inputClicked, setInputClicked] = useState(false)

  useEffect(() => {
    setNewListTitle('')
  }, [activeBoard])

  const handleAddList = () => {
    if (!newListTitle.trim()) {
      alert('Please enter a list title')
      return
    }
    dispatch(createList({ boardId: activeBoard.id, listTitle: newListTitle }))
    setNewListTitle('')
  }

  // const onDragEnd = result => {
  //   if (!result.destination) return
  //   const { source, destination, draggableId } = result
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   )
  //     return

  //   dispatch(
  //     moveTask({
  //       sourceBoardId: activeBoard.id,
  //       sourceListId: parseInt(source.droppableId),
  //       destListId: parseInt(destination.droppableId),
  //       taskId: parseInt(draggableId)
  //     })
  //   )
  // }

  if (!activeBoard) {
    return <p className='text-gray-300'>No board selected</p>
  }

  return (
    <div className='flex flex-col gap-4 w-full min-h-full bg-gray-900 rounded-lg shadow-lg p-4 text-white'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>{activeBoard.title}</h2>
        <div
          className={`bg-gray-800 flex gap-4 ${
            inputClicked ? 'w-[50%]' : ''
          } items-center justify-center rounded-lg p-4 border border-gray-600 transition-all duration-300`}
        >
          <input
            type='text'
            value={newListTitle}
            onChange={e => setNewListTitle(e.target.value)}
            onFocus={() => setInputClicked(true)}
            onBlur={() => setInputClicked(false)}
            placeholder='New list title'
            className='border border-gray-600 p-2 w-full rounded-md bg-gray-700 text-white placeholder-gray-400'
          />
          <button
            className='bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700'
            onClick={handleAddList}
          >
            Add List
          </button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {activeBoard.list?.map(list => (
          <TaskList key={list.id} list={list} boardId={activeBoard.id} />
        ))}
      </div>
      {/* <DragDropContext onDragEnd={onDragEnd}>
      </DragDropContext> */}
    </div>
  )
}
