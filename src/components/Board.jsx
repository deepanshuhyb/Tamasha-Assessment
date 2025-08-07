import { useEffect, useState } from 'react'
export default function Board ({ activeBoard, setBoards }) {
  const [lists, setLists] = useState()
  const [activeList, setActiveList] = useState(null)
  useEffect(() => {
    if (activeBoard) {
      setLists(activeBoard.list)
      setActiveList(activeBoard.list[0] || null)
    }
  }, [activeBoard])
  function handleAddList () {
    setLists([
      ...lists,
      {
        id: lists.length + 1,
        title: `New List ${lists?.length + 1}`,
        items: []
      }
    ])
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === activeBoard.id
          ? {
              ...board,
              list: [
                ...board.list,
                {
                  id: lists.length + 1,
                  title: `New List ${lists?.length + 1}`,
                  items: []
                }
              ]
            }
          : board
      )
    )
  }

  return (
    <div className='flex flex-col gap-4 w-full min-h-full text-black bg-gradient-to-b from-white via-purple-100 to-yellow-100 rounded-lg shadow-lg p-2'>
      <div className='w-full flex justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Board Content</h2>
        <button
          className='bg-blue-500 text-white w-[40%] p-2 cursor-pointer rounded-md hover:bg-blue-600 transition-colors'
          onClick={handleAddList}
        >
          Add List
        </button>
      </div>

      <div className='grid grid-cols-3 gap-4 w-full'>
        {lists?.map(list => (
          <div
            key={list?.id}
            className={`p-4 hover:scale-101 transition-all rounded-lg cursor-pointer w-full gap-2 flex flex-col ${
              activeList?.id === list?.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveList(list)}
          >
            <h3 className='font-semibold'>{list?.title}</h3>
            <ul className=''>
              {list?.items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
