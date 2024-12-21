import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./timerSlice";
import { StorageKeys } from "@/resources/constants";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Load timers from localStorage with fallback for null values
const loadTimersFromLocalStorage = () => {
  try {
    const timers = localStorage.getItem(StorageKeys.TIMERS);
    return timers ? JSON.parse(timers) : [];

  } catch (error) {
    console.error("Failed to load timers from localStorage:", error);
    return [];
  }
};

export const store = configureStore({
  reducer: { [timerSlice.name]: timerSlice.reducer },
  preloadedState: { [timerSlice.name]: { timers: loadTimersFromLocalStorage(), } },
});

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  try {
    const timersState = store.getState()[timerSlice.name]?.timers;

    if (timersState) {
      localStorage.setItem(StorageKeys.TIMERS, JSON.stringify(timersState));
    }
  } catch (error) {
    console.error("Failed to save timers to localStorage:", error);
  }
});
