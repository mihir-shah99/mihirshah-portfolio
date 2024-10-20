// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, variant, type }) => {
  const baseClasses = "px-4 py-2 rounded-md focus:outline-none transition duration-300";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  type: 'button',
};

export default Button;
