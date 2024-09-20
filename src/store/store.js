import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice.js";
import notesReducer from "./notesSlice.js";

// The `configureStore` function takes a single argument: an object that
// contains the `reducer` field, which is an object that contains the
// reducers for the application. In this case, the `booksReducer` is the
// only reducer in the application, and it is assigned to the `books` key.
// The `configureStore` function returns a Redux store instance that can be
// used to dispatch actions and read the state of the application.
export const store = configureStore({
  reducer: {
    books: booksReducer,
    notes: notesReducer,
  },
});
