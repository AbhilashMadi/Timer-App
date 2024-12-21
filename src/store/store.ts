import { configureStore } from "@reduxjs/toolkit"
import { timerSlice } from "./timerSlice"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: { [timerSlice.reducerPath]: timerSlice.reducer },
})