import { toast } from "sonner";
import { useTimerStore } from "@/hooks/useTimerStore";
import React, { useEffect, useRef, useState } from "react";
import { TimerAudio } from "../utils/audio";
import { formatTime } from "../utils/time";
import { TimerControls } from "./TimerControls";
import { TimerProgress } from "./TimerProgress";
import { Timer } from "@/types/timer";
import { Timer as TimerIcon } from "lucide-react";

import ActionButtons from "./custom/ActionButtons";
import Modal from "./custom/Modal";
import AddTimerForm from "./forms/AddTimerForm";

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { toggleTimer, deleteTimer, updateTimer, restartTimer } = useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const audioTimerRef = useRef<number | null>(null);

  const timerAudio = TimerAudio.getInstance();
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = window.setInterval(() => {
        updateTimer(timer.id);

        if (timer.remainingTime <= 1 && !hasEndedRef.current) {
          hasEndedRef.current = true;

          // Start the audio loop (call play repeatedly)
          audioTimerRef.current = window.setInterval(() => {
            timerAudio.play().catch(console.error);
          }, 1_000);

          // Display snack bar when the timer ends
          toast.success(`Timer "${timer.title}" has ended!`, {
            duration: Infinity,
            action: {
              label: "Dismiss",
              onClick: () => {
                timerAudio.stop();
                clearInterval(audioTimerRef.current!);
              },
            },
          });
        }
      }, 1_000);
    }

    // Clean up interval when timer is no longer running
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [timer, timerAudio]);

  const handleEditModal = (): void => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleRestart = () => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  };

  const handleDelete = () => {
    timerAudio.stop();
    deleteTimer(timer.id);
  };

  const handleToggle = () => {
    if (timer.remainingTime <= 0) {
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
  };

  return (
    <>
      {/* Edit Timer Modal */}
      <Modal
        title={<><TimerIcon className="text-blue-500 inline" />{" "}Edit Form</>}
        children={<AddTimerForm onClose={handleEditModal} editTimerObj={timer} />}
        isOpen={isEditModalOpen}
        onClose={handleEditModal}
        aria-labelledby="edit-timer-modal-title"
        aria-hidden={!isEditModalOpen}
      />

      {/* Timer Item */}
      <section
        className="bg-white p-6 rounded-lg shadow-md md:p-4"
        aria-labelledby="timer-title">
        <header className="flex justify-between gap-4">
          <h3
            id="timer-title"
            className="text-xl font-semibold text-gray-800 md:text-lg"
            tabIndex={0}
            aria-live="polite">
            {timer.title}
          </h3>
          <div>
            <ActionButtons
              editButtonProps={{
                onClick: handleEditModal,
                "aria-label": "Edit timer"
              }}
              resetButtonProps={{
                onClick: handleRestart,
                "aria-label": "Restart timer"
              }}
              deleteButtonProps={{
                onClick: handleDelete,
                "aria-label": "Delete timer"
              }}>
              <ActionButtons.Edit />
              <ActionButtons.Reset />
              <ActionButtons.Delete />
            </ActionButtons>
          </div>
        </header>

        <p className="text-gray-600 mb-4 mt-2 text-sm md:text-xs" aria-describedby="timer-description">
          {timer.description}
        </p>

        <time
          id="timer-time"
          className="text-4xl font-mono flex_center font-bold text-gray-800 mb-4 md:text-3xl"
          aria-live="assertive"
        >
          {formatTime(timer.remainingTime)}
        </time>

        <TimerProgress
          progress={(timer.remainingTime / timer.duration) * 100}
          aria-labelledby="timer-time"
        />

        <div className="flex justify-center">
          <TimerControls
            isRunning={timer.isRunning}
            remainingTime={timer.remainingTime}
            duration={timer.duration}
            onToggle={handleToggle}
            onRestart={handleRestart}
            aria-label={timer.isRunning ? "Pause timer" : "Start timer"}
          />
        </div>
      </section>
    </>
  );
};
