import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const buttonClass = {
    addList: 'add-button',
    addCard: 'add-button add-card-button',
    success: 'btn btn-success',
    editor: 'btn btn-editor'
  }

  return(
    <button 
    className={buttonClass[props.variant]}
    onClick={props.onButtonClick}
    >
      {props.icon || ''}
      <span>{props.text}</span>
    </button>
  )
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'editor', 'addList', 'addCard'])
};

export default Button;
