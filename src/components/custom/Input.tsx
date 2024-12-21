import { FC, InputHTMLAttributes, useId } from "react";
import { tw } from "@/utils/lib";
import Label from "./Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  touched: boolean;
  isValid: boolean;
  className?: string;
  errorMessage?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  touched,
  isValid,
  className,
  errorMessage,
  required = false,
  ...restProps
}) => {

  const uId = useId();

  return (
    <div>
      <Label children={label} htmlFor={uId} required={required} />
      <input
        id={uId}
        {...restProps}
        className={tw(
          "bg-gray-50 border focus:outline-blue-500 text-gray-900 text-sm rounded focus:shadow focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
          !isValid && touched && "border-red-500",
          className
        )}
      />
      {!isValid && touched && errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
