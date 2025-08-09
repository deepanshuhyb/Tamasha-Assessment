import { createSlice } from "@reduxjs/toolkit";

const defaultLists = [
  { id: generateRandomId(), title: "To Do", items: [] },
  { id: generateRandomId(), title: "In Progress", items: [] },
  { id: generateRandomId(), title: "Done", items: [] },
];
function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

const savedBoards = JSON.parse(localStorage.getItem("boards")) || [];

export const BoardSlice = createSlice({
  name: "board",
  initialState: {
    boards: savedBoards,
    activeBoard: savedBoards[0] || null,
  },
  reducers: {
    addBoard: (state, action) => {
      const newBoard = {
        id: generateRandomId(),
        title: action.payload,
        list: defaultLists.map((l) => ({ ...l, items: [] })),
      };
      state.boards.push(newBoard);
      state.activeBoard = newBoard;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    deleteBoard: (state, action) => {
      const boardId = action.payload;
      state.boards = state.boards.filter((b) => b.id !== boardId);
      state.activeBoard = state.boards[0] || null;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    renameBoard: (state, action) => {
      const { boardId, newTitle } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.title = newTitle;
        if (state.activeBoard?.id === boardId) {
          state.activeBoard.title = newTitle;
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    setActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
    createList: (state, action) => {
      const { boardId, listTitle } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const newList = {
          id: generateRandomId(),
          title: listTitle,
          items: [],
        };
        board.list.push(newList);
        if (state.activeBoard?.id === boardId) {
          state.activeBoard.list.push(newList);
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    updateListTitle: (state, action) => {
      const { boardId, listId, newTitle } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.list.find((l) => l.id === listId);
        if (list) {
          list.title = newTitle;
          if (state.activeBoard?.id === boardId) {
            const activeList = state.activeBoard.list.find(
              (l) => l.id === listId
            );
            if (activeList) {
              activeList.title = newTitle;
            }
          }
          localStorage.setItem("boards", JSON.stringify(state.boards));
        }
      }
    },
    deleteList: (state, action) => {
      const { boardId, listId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.list = board.list.filter((l) => l.id !== listId);
        if (state.activeBoard?.id === boardId) {
          state.activeBoard.list = state.activeBoard.list.filter(
            (l) => l.id !== listId
          );
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    createTask: (state, action) => {
      const { boardId, listId, title, description } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.list.find((l) => l.id === listId);
        if (list) {
          const randomId = Math.floor(Math.random() * 10000);
          const newTask = {
            id: generateRandomId(),
            title,
            description: description || "",
          };
          list.items.push(newTask);
          if (state.activeBoard?.id === boardId) {
            const activeList = state.activeBoard.list.find(
              (l) => l.id === listId
            );
            if (activeList) {
              activeList.items.push(newTask);
            }
          }
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    editTask: (state, action) => {
      const { boardId, listId, taskId, title, description } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.list.find((l) => l.id === listId);
        if (list) {
          const task = list.items.find((t) => t.id === taskId);
          if (task) {
            task.title = title;
            task.description = description || "";
          }
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    moveTask: (state, action) => {
      const { boardId, listId, sourceId, targetId } = action.payload;
      console.log(action.payload);
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const oldList = board.list.find((l) => l.id === sourceId);
        if (oldList) {
          const taskIndex = oldList.items.findIndex((t) => t.id === listId);
          if (taskIndex !== -1) {
            const [task] = oldList.items.splice(taskIndex, 1);
            const newList = board.list.find((l) => l.id === targetId);
            if (newList) {
              newList.items.push(task);
            }
          }
        }
        if (state.activeBoard?.id === boardId) {
          const activeOldList = state.activeBoard.list.find(
            (l) => l.id === sourceId
          );
          if (activeOldList) {
            const taskIndex = activeOldList.items.findIndex(
              (t) => t.id === listId
            );
            if (taskIndex !== -1) {
              const [task] = activeOldList.items.splice(taskIndex, 1);
              const activeNewList = state.activeBoard.list.find(
                (l) => l.id === targetId
              );
              if (activeNewList) {
                activeNewList.items.push(task);
              }
            }
          }
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    deleteTask: (state, action) => {
      const { boardId, listId, taskId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.list.find((l) => l.id === listId);
        if (list) {
          list.items = list.items.filter((t) => t.id !== taskId);
        }
        if (state.activeBoard?.id === boardId) {
          const activeList = state.activeBoard.list.find(
            (l) => l.id === listId
          );
          if (activeList) {
            activeList.items = activeList.items.filter((t) => t.id !== taskId);
          }
        }
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
  },
});

export default BoardSlice.reducer;

export const {
  addBoard,
  deleteBoard,
  setActiveBoard,
  createList,
  renameList,
  deleteList,
  createTask,
  editTask,
  deleteTask,
  moveTask,
  updateListTitle,
  renameBoard,
} = BoardSlice.actions;
