import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        px-5 py-2
        rounded-lg
        bg-blue-600
        text-white
        font-medium
        hover:bg-blue-700
        transition
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;