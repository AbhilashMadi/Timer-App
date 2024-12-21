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
        title={<><TimerIcon className="text-blue-500 inline" /> Edit Form</>}
        children={<AddTimerForm onClose={handleEditModal} editTimerObj={timer} />}
        isOpen={isEditModalOpen}
        onClose={handleEditModal}
      />

      {/* Timer Item */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <div>
          <div className="flex justify-between mb-4">
            <div className="w-5/6">
              <h3 className="text-xl font-semibold text-gray-800">{timer.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{timer.description}</p>
            </div>
            <div>
              <ActionButtons
                editButtonProps={{ onClick: handleEditModal }}
                resetButtonProps={{ onClick: handleRestart }}
                deleteButtonProps={{ onClick: handleDelete }}>
                <ActionButtons.Edit />
                <ActionButtons.Reset />
                <ActionButtons.Delete />
              </ActionButtons>
            </div>
          </div>

          <time className="text-4xl font-mono flex_center font-bold text-gray-800 mb-4">
            {formatTime(timer.remainingTime)}
          </time>

          <TimerProgress
            progress={(timer.remainingTime / timer.duration) * 100}
          />

          <div className="flex justify-center">
            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              duration={timer.duration}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>
    </>
  );
};
