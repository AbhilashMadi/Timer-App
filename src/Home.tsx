import { useState } from "react";
import { Toaster } from "sonner";

import Header from "@/components/common/Header";
import Modal from "@/components/custom/Modal";
import AddTimerForm from "@/components/forms/AddTimerForm";
import { TimerList } from "@/components/TimerList";
import { Clock } from "lucide-react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddTimerModel = (): void => {
    setIsModalOpen(!isModalOpen);
  }

  return (<main className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100">
    <Toaster position={window.matchMedia("(max-width: 768px)").matches
      ? "bottom-center"
      : "top-right"} />
    <div className="container mx-auto p-8">
      <Header onAddTimeClick={toggleAddTimerModel} />
      <TimerList />
      <Modal
        title={<><Clock className="text-blue-500 inline" size={20} /> Add New Timer</>}
        children={<AddTimerForm onClose={toggleAddTimerModel} />}
        isOpen={isModalOpen}
        onClose={toggleAddTimerModel} />
    </div>
  </main>
  );
}

export default Home;