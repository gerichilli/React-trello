import React from 'react';
import PropTypes from 'prop-types';

/*
 * TODO: Create the Button component
 *
 * Requirements:
 * - Must be named Button
 * - Must be a function component
 * - Should render a <button> element
 * - Should render a <span> element inside the <button> for the text
 * - Should render an optional icon (from react-icons) before the text
 * 
 * Tips:
 * - You can use the 'btn' and 'btn-success' CSS classes for styling
 * 
 */ 
const Button = (props) => null;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'editor'])
};

export default Button;
