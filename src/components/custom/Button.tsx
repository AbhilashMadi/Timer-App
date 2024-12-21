import { FC, ButtonHTMLAttributes } from "react";
import { tw } from "@/utils/lib";

type ButtonVariants = "primary" | "ghost" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariants;
}

const Button: FC<ButtonProps> = ({ children, className, variant = "primary", ...restProps }) => {
  const commonStyles = "font-medium rounded text-sm px-5 py-2.5 focus:outline-none focus:ring-4  disabled:cursor-not-allowed disabled:bg-opacity-70 disabled:hover:bg-none";

  // Variant-specific styles
  const variants: Record<ButtonVariants, string> = {
    primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
    ghost: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100",
    icon: "p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors",
  };

  return (
    <button {...restProps} className={tw(commonStyles, variants[variant], className)}>
      {children}
    </button>
  );
};

export default Button;
