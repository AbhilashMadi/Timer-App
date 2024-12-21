import { type FC } from "react";

import Mapper from "@/components/custom/Mapper";
import { Timer } from "@/types/timer";

import { useTimerStore } from "@/hooks/useTimerStore";
import { TimerItem } from "./TimerItem";
import { EmptyState } from "./EmptyState";

export const TimerList: FC = () => {
  const { timers } = useTimerStore();

  return (
    <section className="space-y-4">
      {timers.length === 0
        ? <EmptyState />
        : <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Mapper<Timer>
            data={timers}
            comp={(data) => <TimerItem timer={data} />} />
        </div>}
    </section>
  );
};
