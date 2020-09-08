import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useClickOutsideEffect } from '../hooks';

const Popover = ({ title = '', children = null, onClickOutside = () => null, offset = {}}) => {
  const popover = useRef(null);

  useClickOutsideEffect(popover, onClickOutside);

  return (
    <div
      ref={popover}
      className="popover"
      style={{
        marginTop: `${offset?.top ?? 0}px`,
        marginLeft: `${offset?.left ?? 0}px`
      }}
    >
      {
        title ? (
          <>
            <div className="popover-header">
              <h4>{title}</h4>
            </div>
            <hr className="divider" />
          </>
        ) : null
      }
      {children}
    </div>
  );
};

Popover.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClickOutside: PropTypes.func,
  offset: PropTypes.exact({
    top: PropTypes.number,
    left: PropTypes.number
  })
};

export default Popover;
