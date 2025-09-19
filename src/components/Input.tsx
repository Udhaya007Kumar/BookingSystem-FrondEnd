import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...rest}
      />
    </div>
  );
};

export default Input;
