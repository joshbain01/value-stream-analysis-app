import React from 'react';

const InputField = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
  const baseStyles = "border border-muted p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-text";
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
};

export default InputField;
