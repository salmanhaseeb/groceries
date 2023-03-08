import { configureStore } from "@reduxjs/toolkit"
import itemReducer from "./../redux/itemsSlice"

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
})
