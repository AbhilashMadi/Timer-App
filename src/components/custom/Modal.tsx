import useKeyPress from "@/hooks/useKeyPress";
import { X } from "lucide-react";
import { type FC, type ReactNode } from "react";
import ReactDOM from "react-dom";

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onClose, children, title, } = props;

  useKeyPress("Escape", onClose, isOpen);

  if (!isOpen) return;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-md shadow-xl relative">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">{title}</h4>
          <button onClick={onClose} className="hover:bg-gray-200 transition-colors p-1 rounded-full"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")!);
};

export default Modal;