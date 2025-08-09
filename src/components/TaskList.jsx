import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, deleteList, moveTask } from '../Redux/slices/board/Board'
import List from './List'
import invariant from 'tiny-invariant'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export default function TaskList ({ list, boardId }) {
  const dispatch = useDispatch()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    invariant(el)
    if (!el) return

    return dropTargetForElements({
      element: el,
      getData: () => ({ type: 'list', listId: list.id, boardId }),
      getIsSticky: () => true,
      onDrop: args => {
        const sourceData = args.source.data
        if (sourceData.type === 'card') {
          console.log('Dropped card on empty list', sourceData, list.id, el.id)
          dispatch(
            moveTask({
              boardId,
              listId: sourceData.listItem.id,
              sourceId: sourceData.cardId,
              targetId: list.id,
              edge: args.edge
            })
          )
        }
      }
    })
  }, [list.id, boardId, dispatch])

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title')
      return
    }
    dispatch(createTask({ boardId, listId: list.id, title: newTaskTitle }))
    setNewTaskTitle('')
  }

  const handleDeleteList = () => {
    dispatch(deleteList({ boardId, listId: list.id }))
  }

  return (
    <div className='bg-gray-800 rounded-lg p-4 border border-gray-600'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold mb-2 text-white'>{list.title}</h3>
        <button
          className='text-red-400 hover:text-red-600'
          onClick={handleDeleteList}
        >
          ✕
        </button>
      </div>

      <ul ref={listRef} className='space-y-2 mb-3 min-h-[50px]'>
        {list.items.map(task => (
          <List key={task.id} task={task} listId={list.id} boardId={boardId} />
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
