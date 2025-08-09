import { useDispatch } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import {
  draggable,
  dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

import { deleteTask } from '../Redux/slices/board/Board'

export default function List ({ task, listId, boardId }) {
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
      } bg-gray-700 p-2 rounded flex justify-between items-center text-white border border-gray-600 cursor-move`}
    >
      <span>{task.title}</span>
      <button
        onClick={handleDeleteTask}
        className='text-red-400 hover:text-red-600'
        aria-label={`Delete task ${task.title}`}
      >
        ✕
      </button>
    </li>
  )
}
