import { type FC } from "react";
import { TimerItem } from "./TimerItem";
import { useTimerStore } from "../store/useTimerStore";
import { EmptyState } from "./EmptyState";

export const EmptyTimers: FC = () => {
  return (
    <div className="h-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <EmptyState />
        <p className="text-gray-500 text-xl font-medium">
          No timers yet. Add one to get started!
        </p>
        <p className="text-gray-400 mt-2">
          Click the "Add Timer" button above to create your first timer.
        </p>
      </div>
    </div>)
}

export const TimerList: FC = () => {
  const { timers } = useTimerStore();

  return (
    <section className="space-y-4">
      {timers.length === 0
        ? <EmptyTimers />
        : (<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {timers.map((timer) => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
        </div>)}
    </section>
  );
};
