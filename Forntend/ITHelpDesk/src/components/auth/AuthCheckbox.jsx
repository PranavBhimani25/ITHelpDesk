import React from "react";

export default function AuthCheckbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
      <input type="checkbox" className="rounded border-gray-300" {...props} />
      {label}
    </label>
  );
}
