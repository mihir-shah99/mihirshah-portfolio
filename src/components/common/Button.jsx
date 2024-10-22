// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = 'button', variant = 'primary', children, ...rest }) => {
  const buttonClass =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-gray-500 text-white hover:bg-gray-600';

  return (
    <button type={type} className={`py-2 px-4 rounded ${buttonClass}`} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
