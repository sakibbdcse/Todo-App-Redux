import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./Slice";

const Store = configureStore({
  reducer: {
    todos: TodoReducer,
  },
});

export default Store;
