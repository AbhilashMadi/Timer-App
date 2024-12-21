import { tw } from "@/utils/lib";
import { type FC, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={tw("flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg", className)}>
      {children}
    </button>
  );
};

export default Button;
