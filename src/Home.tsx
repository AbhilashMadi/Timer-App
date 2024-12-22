import { useState, Suspense, lazy, type FC } from "react";
import { Toaster } from "sonner";

import { type HeaderProps } from "@/components/common/Header";
import { type ModalProps } from "@/components/custom/Modal";
import { type AddTimerFormProps } from "@/components/forms/AddTimerForm";

import Loader from "@/components/common/Loader";
import { Clock } from "lucide-react";

const Header = lazy(() => import("@/components/common/Header")) as FC<HeaderProps>;
const Modal = lazy(() => import("@/components/custom/Modal")) as FC<ModalProps>;
const AddTimerForm = lazy(() => import("@/components/forms/AddTimerForm")) as FC<AddTimerFormProps>;
const TimerList = lazy(() => import("@/components/TimerList")) as FC;

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal state
  const toggleAddTimerModel = () => setIsModalOpen((prev) => !prev);

  // Optimize Toaster position calculation
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const toasterPosition = isMobile ? "bottom-center" : "top-right";

  return (
    <Suspense fallback={<Loader />}>
      <main className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100">
        <Toaster position={toasterPosition} />
        <div className="container mx-auto p-4">
          <Header onAddTimeClick={toggleAddTimerModel} />
          <TimerList />
          <Modal title={<><Clock className="text-blue-500 inline" size={20} /> Add New Timer</>}
            isOpen={isModalOpen}
            onClose={toggleAddTimerModel}
            children={<AddTimerForm onClose={toggleAddTimerModel} />}
          />
        </div>
      </main>
    </Suspense>
  );
}

export default Home;
