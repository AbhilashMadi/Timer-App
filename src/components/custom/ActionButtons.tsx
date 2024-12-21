/* eslint-disable react-hooks/rules-of-hooks */
import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { createContext, useContext, type HTMLAttributes, type ReactNode } from "react";

import { tw } from "@/utils/lib";
import Button from "@/components/custom/Button";

export type ActionButtonProps = HTMLAttributes<HTMLButtonElement>;

interface IActionButtonsContext {
  editButtonProps?: ActionButtonProps;
  resetButtonProps?: ActionButtonProps;
  deleteButtonProps?: ActionButtonProps;
}

const ActionButtonsContext = createContext<IActionButtonsContext | undefined>(undefined);

const useActionButtonsContext = (): IActionButtonsContext => {
  const context = useContext(ActionButtonsContext);

  if (!context) {
    throw new Error("useActionButtonsContext must be used within a ActionButtonsContext.Provider",);
  }

  return context;
};

const ActionButtons = ({
  children,
  className,
  ...props
}: Partial<IActionButtonsContext> & {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <ActionButtonsContext.Provider value={props}>
      <div className={tw("flex w-full justify-end gap-1", className)}>
        {children}
      </div>
    </ActionButtonsContext.Provider>
  );
};

// Delete button
ActionButtons.Delete = () => {
  const { deleteButtonProps } = useActionButtonsContext();
  return <Button variant="icon" title="Delete" className="text-red-500" {...deleteButtonProps}><Trash2 size={18} /></Button>
};

// Edit button
ActionButtons.Edit = () => {
  const { editButtonProps } = useActionButtonsContext();
  return <Button variant="icon" title="Edit" {...editButtonProps}><Pencil size={18} /></Button>
};

// Reset button
ActionButtons.Reset = () => {
  const { resetButtonProps } = useActionButtonsContext();
  return <Button variant="icon" title="Reset" className="text-yellow-500" {...resetButtonProps}><RotateCcw size={18} /></Button>
};

export default ActionButtons;
