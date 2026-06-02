import * as React from "react";
import { cn } from "../utils/classnames";

type CustomInputProps = {
  label: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  errorMsg?: string;
};

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "suffix" | "label"
>;

type InputProps = NativeInputProps & CustomInputProps;

function Input({
  name,
  label,
  type = "text",
  suffix,
  prefix,
  placeholder,
  required,
  errorMsg,
  ...props
}: InputProps) {
  const dateRef = React.useRef<HTMLInputElement>(null);
  const openDatePicker = () => {
    dateRef?.current?.showPicker();
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="text-sm/6 font-medium text-gray-900 flex gap-1"
      >
        {label}
        {required && <p className="text-red-500">*</p>}
      </label>
      <div
        className="mt-2 h-auto"
        onClick={type == "date" ? openDatePicker : () => {}}
      >
        <div
          className={cn(
            "flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600",
            prefix ? "" : "pl-3",
          )}
        >
          {prefix && (
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 flex justify-center px-2">
              {prefix}
            </div>
          )}
          <input
            ref={dateRef}
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={props.onChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            {...props}
          />
          {suffix && (
            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
              {suffix}
            </div>
          )}
        </div>
        {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
      </div>
    </div>
  );
}

export { Input };
