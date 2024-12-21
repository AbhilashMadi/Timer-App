import { StorageKeys } from "@/resources/constants";
import { type Timer } from "@/types/timer";

export const loadState = (): { timers: Timer[] } => {
  try {
    const serializedState = localStorage.getItem(StorageKeys.TIMERS);

    return serializedState
      ? JSON.parse(serializedState)
      : { timers: [] };
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return { timers: [] };
  }
};

export const saveState = (state: { timers: Timer[] }): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(StorageKeys.TIMERS, serializedState);
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};
