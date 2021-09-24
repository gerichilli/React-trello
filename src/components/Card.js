import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
// Components
import { Draggable } from 'react-beautiful-dnd';
import Tag from './Tag';

const Card = (props) => {
  const tags = props.tags.map((tag, index)=> <Tag text={tag} key={`${tag}-${index}`}/>);

  const cardRef = useRef(null);

  const handleClick = () => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const cardPosition = {top: cardRect.top, left: cardRect.left};
    props.onEditCard(props.id, props.description, props.tags, cardPosition);
  }
  
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => 
      <li  
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      > 
        <div className="card" ref={cardRef} onClick={handleClick}>
          <div>{tags}</div>
          <div>#{props.number} {props.description}</div>  
        </div>
        {provided.placeholder}
      </li>
      }
    </Draggable>
    
  )
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default Card;
