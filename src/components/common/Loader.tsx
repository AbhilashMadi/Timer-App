import { Hourglass } from "lucide-react";
import { useEffect, useRef, type FC } from "react";

const Loader: FC = () => {
  const dotsRef = useRef(0);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const DOTS_LENGTH = 3;

  useEffect(() => {

    const timer = setInterval(() => {
      dotsRef.current = (dotsRef.current + 1) % (DOTS_LENGTH + 1);
      if (textRef.current) textRef.current.textContent = ".".repeat(dotsRef.current);
    }, 400);

    return () => { clearInterval(timer) };
  }, []);

  return (
    <main className="min-h-screen w-full flex_center bg-gray-100">
      <div className="space-y-2">
        <Hourglass className="text-blue-500 animate-spin block duration-1000 mx-auto" size={32} />
        <p className="text-lg font-medium text-gray-700">
          Loading your timers<span ref={textRef}></span>
        </p>
      </div>
    </main>
  );
};

export default Loader;
