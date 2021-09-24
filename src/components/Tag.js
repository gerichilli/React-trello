import React from 'react';
import PropTypes from 'prop-types';

const Tag = (props) => {
  if(!props.text) return null;
  else {
    return (
      <span className="tag">
        {props.text}
      </span>
    )
  }
};

Tag.propTypes = {
  text: PropTypes.string.isRequired
};

export default Tag;
