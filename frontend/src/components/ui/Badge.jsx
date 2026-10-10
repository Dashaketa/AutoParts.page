import React from "react";

export function Badge({ children, variant = "default" }) {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium";
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-400 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}
