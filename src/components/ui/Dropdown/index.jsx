import React, { useState } from 'react';

const Dropdown = ({ options, onChange, className }) => {
  const [selected, setSelected] = useState(options[0] || '');

  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className={`border rounded p-2 ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
