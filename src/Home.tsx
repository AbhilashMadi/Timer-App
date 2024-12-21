import { useState } from "react";
import { Toaster } from "sonner";
import { AddTimerModal } from "./components/AddTimerModal";
import Header from "./components/common/Header";
import { TimerList } from "./components/TimerList";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTimerModel = (): void => {
    setIsModalOpen(!isModalOpen);
  }

  return (<main className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100">
    <Toaster position="top-right" />
    <div className="container mx-auto px-4 py-8">
      <Header onAddTimeClick={toggleTimerModel} />
      <TimerList />
      <AddTimerModal
        isOpen={isModalOpen}
        onClose={toggleTimerModel} />
    </div>
  </main>
  );
}

export default Home;