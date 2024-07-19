import React from 'react';

const Input = ({ label, value, onChange, type = 'text', name, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className="border rounded p-2"
      />
    </div>
  );
};

export default Input;
