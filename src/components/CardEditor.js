import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Icons
import { 
  IoMdCopy as CopyIcon, 
  IoMdArchive as ArchiveIcon,
  IoMdCreate as EditIcon,
  IoMdClose as RemoveIcon  
} from 'react-icons/io';
// Components
import Button from './Button';
import Form from './Form';
import Popover from './Popover';
import Tag from './Tag';

/*
 * TODO: Create the CardEditor component
 *
 * Requirements:
 * - Must be named CardEditor
 * - Must be a class component
 * - Should render a Form component to edit the card description (that contain a textarea and a submit button)
 * - Should render a list of buttons for all editing actions (edit labels, copy, archive)
 * - Should render a Popover component for displaying the label editing form:
 *    - Should render the list of tags
 *    - Should render an icon next to each tag to let the user remove each tag individually
 *    - Should render a Form component to add a new tag (that contain an input and a submit button)
 * 
 * Tips:
 * - You can use the 'editor-modal' and 'editor-actions' CSS classes for styling
 * 
 */ 
class CardEditor extends Component {
  constructor(props) {
    super(props);

    // TODO: Define your state properties here
    this.state = {}
  }

  // TODO: render the CardEditor UI.
  render() {
    return (
      <div className="editor-modal">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: `${this.props?.position?.top ?? 0}px`,
            left: `${this.props?.position?.left ?? 0}px`
          }}
        >
          <div>
            { /* render editor form */ }
          </div>
          <ul className="editor-actions">
            { /* render editor actions */ }
            { /* render tags editing form */ }
          </ul>
        </div>
      </div>
    );
  }
};

CardEditor.defaultProps = {
  initialValue: '',
  tags: [],
  position: null,
  onSaveCard: () => null,
  onRemoveTag: () => null,
  onAddTag: () => null,
  onCopyCard: () => null,
  onArchiveCard: () => null
};

CardEditor.propTypes = {
  initialValue: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  position: PropTypes.exact({
    top: PropTypes.number,
    left: PropTypes.number
  }),
  onSaveCard: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTag: PropTypes.func,
  onCopyCard: PropTypes.func,
  onArchiveCard: PropTypes.func
};

export default CardEditor;
