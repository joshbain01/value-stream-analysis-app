import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  const baseStyles = "bg-surface border border-muted rounded-xl shadow-lg p-6 transition-transform duration-300";
  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
