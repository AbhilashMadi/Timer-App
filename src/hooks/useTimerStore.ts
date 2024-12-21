import { addTimer, deleteTimer, toggleTimer, updateTimer, restartTimer, editTimer } from "@/store/timerSlice"
import { Timer } from "@/types/timer";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

export const useTimerStore = () => {
  const dispatch = useAppDispatch();
  const { timers } = useAppSelector((state) => state.timer);

  return {
    timers: timers,
    addTimer: (timer: Omit<Timer, "id" | "createdAt">) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};