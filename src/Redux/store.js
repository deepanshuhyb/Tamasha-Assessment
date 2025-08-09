import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/Counter";
import boardReducer from "./slices/board/Board";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
  },
});
