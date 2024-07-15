import React from 'react';

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded font-medium ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

