import React from 'react';
import PropTypes from 'prop-types';
// Icons
import { MdMoreHoriz as MenuIcon } from "react-icons/md";
// Components
import Popover from './Popover';

const Menu = (props) => {
  const actions = props.actions.map((actionsGroup, index) => {
    return (
      <div key={index}>
          <ul className="menu-actions">
            {actionsGroup.map(action => (
              <li 
              className="menu-action" 
              key={action.title}
              onClick={action.onClick}
              > 
                <p>{action.title}</p>
              </li>
            ))}
          </ul>
          <hr className="divider"></hr>
      </div>
    )
  })

  const toggleMenu = () => {
    props.onClick(props.id);
  }

  return (
    <div className="menu">
      <MenuIcon 
        onClick={toggleMenu}
      />      
      {
        props.isOpen ? (
          <>
            <Popover 
            title='List Actions'
            onClickOutside={toggleMenu}
            >
              {actions}
            </Popover>
          </>
        ) : null
      }
    </div>
  )
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        onClick: PropTypes.func,
        title: PropTypes.string.isRequired
      })
    )
  )
};

export default Menu;
