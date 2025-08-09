import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/Board";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});
