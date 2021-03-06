import React from 'react'
import PropTypes from 'prop-types';

const Button = ({ onClick, className = {foo: 'bar'}, children,}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>
  
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}


  export default Button; 