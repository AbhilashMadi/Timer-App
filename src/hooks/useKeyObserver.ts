import { useEffect, useState, useCallback } from "react";

// Observer Hook (Register & Observer Pattern)
type KeyCallback = (event: KeyboardEvent) => void;

export function useKeyObserver() {
  const [keyRegistry, setKeyRegistry] = useState<Map<string, KeyCallback>>(new Map());

  const registerKey = useCallback((key: string, callback: KeyCallback) => {
    setKeyRegistry((prevRegistry) => new Map(prevRegistry).set(key, callback));
  }, []);

  const unregisterKey = useCallback((key: string) => {
    setKeyRegistry((prevRegistry) => {
      const newRegistry = new Map(prevRegistry);
      newRegistry.delete(key);
      return newRegistry;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const callback = keyRegistry.get(event.key);
      if (callback) {
        callback(event);
      }
    };

    // Attach the keydown event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => { document.removeEventListener("keydown", handleKeyDown); };
  }, [keyRegistry]);

  return { registerKey, unregisterKey };
}