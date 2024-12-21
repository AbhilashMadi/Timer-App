import { ReactNode, FC } from "react";

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

const Label: FC<LabelProps> = ({ children, htmlFor, required, className }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-900 ${className}`}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
