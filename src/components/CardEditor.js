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

class CardEditor extends Component {
  constructor(props) {
    super(props);

    // TODO: Define your state properties here
    this.state = {
      isTagEditOpen: false,
      isCloseEditor: true
    }

    this.handleOpenTagsEdit = this.handleOpenTagsEdit.bind(this);
    this.handleCloseTagsEdit = this.handleCloseTagsEdit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleOpenTagsEdit() {
    this.setState({
      isTagEditOpen: true,
      isCloseEditor: false
    })
  }

  handleCloseTagsEdit() {
    this.setState({
      isTagEditOpen: false,
      isCloseEditor: false
    })
  }

  handleClickOutside(e) {
    if(!e.target.closest('.editor-area') && this.state.isCloseEditor) this.props.onCancelEdit();
    this.setState({isCloseEditor: true});
  }

  // TODO: render the CardEditor UI.
  render() {
    const labels = this.props.tags.map((tag, index) => (
      <li 
      className="label" 
      key={`${tag}${index}`} 
      onClick={() => this.props.onRemoveTag(index)}
      >
        <RemoveIcon />
        <p>{tag}</p>
      </li>
    ))

    return (
      <div className="editor-modal" onClick={this.handleClickOutside}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: `${this.props?.position?.top ?? 0}px`,
            left: `${this.props?.position?.left ?? 0}px`
          }}

          className="editor-area"
        >
          <div 
          style={{
            display: "flex",
            flexDirection: "column"
          }}
          >
            { /* render editor form */ }
            <Form 
              type="editor"
              buttonText="Save"
              variant="success"
              value={this.props.text}
              onClickCancel={null}
              onClickSubmit={this.props.onSaveCard}
            />
          </div>
          { /* render editor actions */ }
          <ul className="editor-actions">
            <li className="editor-action">
              <Button 
                variant='editor' 
                icon={<EditIcon/>}
                text= 'Edit Labels'
                onButtonClick={this.handleOpenTagsEdit}
              />
              { /* render tags editing form */ }
              {
                this.state.isTagEditOpen &&
                <Popover 
                  title='Labels'
                  onClickOutside={this.handleCloseTagsEdit}
                  offset={{top: -35, left: 0}}
                >
                  {/* {actions} */}
                  <ul className="labels">
                    {labels}
                  </ul>
                  <h4 className="new-label-title">Add a new label</h4>
                  <Form 
                    type="labels"
                    buttonText="Add"
                    variant="success"
                    placeholder='Enter a name for this label...'
                    onClickSubmit={this.props.onAddTag}
                    onClickCancel={null}
                  />
                </Popover>
              }
            </li>
            <li className="editor-action">
              <Button 
                variant='editor' 
                icon={<CopyIcon/>}
                text= 'Copy'
                onButtonClick={this.props.onCopyCard}
              />
            </li>
            <li className="editor-action">
              <Button 
                variant='editor' 
                icon={<ArchiveIcon/>}
                text= 'Archive'
                onButtonClick={this.props.onArchiveCard}
              />
            </li>
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
