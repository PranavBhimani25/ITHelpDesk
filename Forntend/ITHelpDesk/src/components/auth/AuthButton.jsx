import React from "react";

export default function AuthButton({ children, ...props }) {
  return (
    <button
      className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 transition"
      {...props}
    >
      {children}
    </button>
  );
}
