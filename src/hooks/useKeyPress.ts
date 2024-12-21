import { useEffect } from "react";

function useKeyPress(key: string, callback: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback, isActive]);
}

export default useKeyPress;
