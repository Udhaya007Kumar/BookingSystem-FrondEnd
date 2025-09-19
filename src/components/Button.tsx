import React from "react";
import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<Props> = ({ children, loading, className, ...rest }) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50",
        className
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
