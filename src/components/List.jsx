import { useDispatch } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import EditTaskModal from './Modals/EditTaskModal'
import {
  draggable,
  dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import Edit from '../assets/svg/Edit.svg'
import { deleteTask } from '../Redux/slices/board/Board'

export default function List ({ task, listId, boardId }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const taskRef = useRef(null)
  const dispatch = useDispatch()
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const taskEl = taskRef.current
    invariant(taskEl)

    return combine(
      draggable({
        element: taskEl,
        getInitialData: () => ({
          type: 'card',
          cardId: listId,
          listItem: task
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false)
      }),
      dropTargetForElements({
        element: taskEl,
        getData: ({ input, element }) => {
          const data = { type: 'card', cardId: task.id }
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom']
          })
        },
        getIsSticky: () => true,
        onDragEnter: args => {
          if (args.source.data.cardId !== task.id) {
            console.log('Drag entered on', task.title, listId, args)
            dispatch(
              moveTask({
                boardId,
                //   targetListId: list.id,
                listId: sourceData.listItem.id,
                sourceId: sourceData.cardId,
                targetId: listId,
                edge: args.edge
              })
            )
          }
        }
      })
    )
  }, [task.id, dispatch, boardId, listId, task.title])

  const handleDeleteTask = () => {
    dispatch(deleteTask({ boardId, listId, taskId: task.id }))
  }

  return (
    <li
      ref={taskRef}
      className={`card ${
        isDragging ? 'dragging' : ''
      } bg-gray-700 p-2 rounded flex w-full justify-between items-center text-white border border-gray-600 cursor-move`}
    >
      {isModalOpen && (
        <EditTaskModal
          toggleModal={toggleModal}
          boardId={boardId}
          task={task}
          listId={listId}
        />
      )}
      <span className='flex gap-2 flex-col w-full overflow-hidden'>
        {task.title}
        <span className='text-gray-400 text-sm max-w-[80%] overflow-scroll hide-scrollbar'>
          {task?.description}
        </span>
      </span>
      <span className='flex gap-2 items-center'>
        <button
          onClick={() => toggleModal()}
          className='text-gray-400 hover:text-gray-600'
        >
          <img src={Edit} className='h-4 w-3' alt='' />
        </button>
        <button
          onClick={handleDeleteTask}
          className='text-red-400 hover:text-red-600'
          aria-label={`Delete task ${task.title}`}
        >
          ✕
        </button>
      </span>
    </li>
  )
}
