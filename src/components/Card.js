import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Draggable } from 'react-beautiful-dnd';
import Tag from './Tag';

/*
 * TODO: Create the Card component
 *
 * Requirements:
 * - Must be named Card
 * - Must be a function component
 * - Should render a <div> element as the container for the card content
 * - Should render the tags list at the top of the card content
 * - Should render the card number and description below the tags
 * 
 * Tips:
 * - You can use the 'card' CSS class for styling
 *
 * [BONUS]:
 * - Wrap the card inside the <Draggable> component
 * --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
 * - Add the draggableId prop to it (should be the card ID)
 * - Add the index prop to it (should be the card index)
 * - Add the children function that returns your card component and bind everything together
 * --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md#children-function-render-props--function-as-child
 */
const Card = (props) => (
  <div className="card">
    { /* render tags list */ }
    { /* render card number and description */ }
  </div>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default Card;
