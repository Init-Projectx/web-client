import React from 'react';

const Input = ({ label, value, onChange, type = 'text', className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded p-2"
      />
    </div>
  );
};

export default Input;
