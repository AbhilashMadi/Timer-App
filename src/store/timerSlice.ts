import { Timer } from "@/types/timer";
import { generateId } from "@/utils/generators";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  timers: [] as Timer[],
};

interface EditTimerPayload {
  id: string;
  updates: Partial<Timer>;
}

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    addTimer: (state, action: PayloadAction<Omit<Timer, "id" | "createdAt">>) => {
      state.timers.push({
        ...action.payload,
        id: generateId(),
        createdAt: Date.now(),
      });
    },

    deleteTimer: (state, action: PayloadAction<string>) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
    },

    toggleTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },

    updateTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer && timer.isRunning) {
        timer.remainingTime -= 1;
        timer.isRunning = timer.remainingTime > 0;
      }
    },

    restartTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    },

    editTimer: (state, action: PayloadAction<EditTimerPayload>) => {
      const { id, updates } = action.payload;
      const timer = state.timers.find(timer => timer.id === id);
      if (timer) {
        Object.assign(timer, updates);
        timer.remainingTime = updates.duration || timer.remainingTime;
        timer.isRunning = false;
      }
    },
  },
});

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;
