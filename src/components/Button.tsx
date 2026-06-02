import type { ReactNode } from "react";

export type Variant = "primary" | "secondary" | "danger" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg" | "xs";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
  };

  const sizes: Record<Size, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledStyles =
    disabled || loading
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

  const widthStyle = fullWidth ? "w-full" : "";

  const finalClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabledStyles}
    ${widthStyle}
    ${className}
  `;

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
