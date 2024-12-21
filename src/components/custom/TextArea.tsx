import { FC, TextareaHTMLAttributes, useId } from "react";
import { tw } from "@/utils/lib";
import Label from "./Label";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  touched: boolean;
  isValid: boolean;
  className?: string;
  errorMessage?: string;
  required?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
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
      <textarea
        id={uId}
        {...restProps}
        className={tw(
          "block w-full focus:outline-blue-500 focus:shadow p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500",
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

export default TextArea;
