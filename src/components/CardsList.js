import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Icons
import { MdAdd as AddIcon } from 'react-icons/md';
// Components
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import CardEditor from './CardEditor';
import Menu from './Menu';
import Form from './Form';
import Button from './Button';

class CardsList extends Component {
  constructor(props) {
    super(props);

    // CardsList state
    this.state = { 
      creatingNewCard: false,
      editCardId: null,
      editCardText: '',
      editCardTags: [],
      editorPosition: {top: null, left: null}
    };

    // Define all the card actions here
    this.actions = [
      [
        { 
          title: 'Add Card...',
          onClick: () => {this.handleCreateNewCard()} // TODO
        },
        { 
          title: 'Copy List...',
          onClick: () => {this.props.onCopyList(this.props.id)}// TODO
        }
      ],
      [
        {
          title: 'Move All Cards in This List...',
          onClick: () => {this.props.onMoveAllCards(this.props.id)} // TODO
        },
        {
          title: 'Archive All Cards in This List...',
          onClick: () => {this.props.onRemoveAllCards(this.props.id)} // TODO
        },
      ],
      [
        {
          title: 'Archive This List',
          onClick: () => {this.props.onRemoveList(this.props.id)} // TODO
        }
      ]
    ];

    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleCancelNewCard = this.handleCancelNewCard.bind(this);
    this.handleCreateNewCard = this.handleCreateNewCard.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleCopyCard = this.handleCopyCard.bind(this);
    this.handleArchiveCard = this.handleArchiveCard.bind(this);
    this.handleSaveCard = this.handleSaveCard.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  handleAddNewCard(cardText = '') {
    this.props.onAddCard(this.props.id, cardText);
    this.setState({ creatingNewCard: false });
  }

  handleCancelNewCard() {
    this.setState({ creatingNewCard: false });
  }

  handleCreateNewCard() {
    this.setState({ creatingNewCard: true });
  }

  handleEditCard(id, text, tags, position) {
    this.setState({
      editCardId: id,
      editCardText: text,
      editCardTags: tags,
      editorPosition: position
    })
  }

  handleCancelEdit() {
    this.setState({
      editCardId: null,
      editCardText: '',
      editCardTags: []
    })
  }

  handleCopyCard() {
    this.props.onCopyCard(this.props.id, this.state.editCardId);
    this.setState({editCardId: null});
  }

  handleArchiveCard() {
    this.props.onRemoveCard(this.props.id, this.state.editCardId);
    this.handleCancelEdit();
  }

  handleSaveCard(text) {
    this.props.onEditCard(this.state.editCardId, text);
    this.setState({editCardId: null});
  }

  handleRemoveTag(tagId) {
    this.props.onRemoveTag(this.state.editCardId, tagId);
    this.setState({
      editCardTags: this.state.editCardTags.filter((_, index) => index !== tagId)
    })
  }
  
  handleAddTag(text) {
    this.setState({ editCardTags: [...this.state.editCardTags, text]});
    this.props.onAddTag(this.state.editCardId, text);
  }

  renderHeader() {
    const numberOfCards = this.props.cards.length;

    return (
      <div className="cards-list-header">
        <div className="cards-list-title">
          { /* render the list title */ }
          <h3>{this.props.title}</h3>
          { /* render the Menu component */ }
          <Menu 
          id={this.props.id}
          actions={this.actions}
          isOpen={this.props.isMenuOpen}
          onClick={this.props.onToggleMenu}
          />
        </div>
        { /* render the number of cards in this list */ }
        <p>{numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}</p>
      </div>
    );
  }

  renderCards() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <Card 
        key={card.id}
        id={card.id}
        index={index}
        number={card.number}
        description={card.description}
        tags={card.tags}
        onEditCard={this.handleEditCard}
        />
      )  
    })
    return (
      <Droppable
      droppableId={this.props.id}
      direction= "vertical"
      type= "card"
      >
        {provided => 
        <ul className="cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
          {cards}
          {provided.placeholder}
        </ul>
        }
      </Droppable>
      
    );
  }

  renderFooter() {
    if(this.state.creatingNewCard) {
      return (
        <Form 
        type="card"
        buttonText="Add Card"
        variant="success"
        placeholder="Enter a title for this card"
        onClickCancel={this.handleCancelNewCard}
        onClickSubmit={this.handleAddNewCard}
        />
      )
    } else {
      return (
        <Button 
          icon={<AddIcon />}
          variant="addCard"
          text="Add a new card"
          onButtonClick={this.handleCreateNewCard}
        />
      )
    }
  }

  render() {   
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => 
        <li 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <div className="cards-list">
            { this.renderHeader() }
            { this.renderCards() }
            { this.renderFooter() }
            { /* render card editor */ }
            { this.state.editCardId && 
            <CardEditor 
            text={this.state.editCardText}
            tags={this.state.editCardTags}
            position={this.state.editorPosition}
            onCancelEdit={this.handleCancelEdit}
            onArchiveCard={this.handleArchiveCard}
            onCopyCard={this.handleCopyCard}
            onSaveCard={this.handleSaveCard}
            onAddTag={this.handleAddTag}
            onRemoveTag={this.handleRemoveTag}
            />
            }
          </div>
          {provided.placeholder}
        </li>
        }
        
      </Draggable>
    );
  }
};

CardsList.defaultProps = {
  cards: null,
  isMenuOpen: false,
  onToggleMenu: () => null,
  onAddCard: () => null,
  onRemoveCard: () => null,
  onRemoveList: () => null,
  onRemoveAllCards: () => null,
  onCopyList: () => null,
  onMoveAllCards: () => null,
  onCopyCard: () => null,
  onEditCard: () => null,
  onRemoveTag: () => null,
  onAddTag: () => null
};

CardsList.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  isMenuOpen: PropTypes.bool,
  onToggleMenu: PropTypes.func,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onRemoveList: PropTypes.func,
  onRemoveAllCards: PropTypes.func,
  onCopyList: PropTypes.func,
  onMoveAllCards: PropTypes.func,
  onCopyCard: PropTypes.func,
  onEditCard: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTag: PropTypes.func
};

export default CardsList;
