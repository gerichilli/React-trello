import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Icons
import { IoMdAdd as AddIcon } from 'react-icons/io';
// Components
import Card from './Card';
import CardEditor from './CardEditor';
import Menu from './Menu';
import Form from './Form';

/*
 * TODO: Create the CardsList component
 *
 * Requirements:
 * - Must be named CardsList
 * - Must be a class component
 * - Should render a <div> element as the container for the card
 * - Should render the tags list at the top of the card content
 * - Should render the card number and description below the tags
 * 
 * Tips:
 * - You can use the 'card' CSS class for styling
 * 
 */ 
class CardsList extends Component {
  constructor(props) {
    super(props);

    // CardsList state
    this.state = { 
      creatingNewCard: false,
      editCardId: null,
      editCardText: '',
      editCardTags: []
    };

    // TODO: Define all the card actions here
    this.actions = [
      [
        { 
          title: 'Add Card...',
          onClick: () => null // TODO
        },
        { 
          title: 'Copy List...',
          onClick: () => null // TODO
        }
      ],
      [
        {
          title: 'Move All Cards in This List...',
          onClick: () => null // TODO
        },
        {
          title: 'Archive All Cards in This List...',
          onClick: () => null // TODO
        },
      ],
      [
        {
          title: 'Archive This List',
          onClick: () => null // TODO
        }
      ]
    ];

    // TODO: Bind your class methods here
    // ...
  }

  // TODO: implement the handleAddNewCard method to add a new card to the list.
  // Tips:
  // - Call the `this.props.onAddCard` function to add a new card
  // - Use the `this.setState` method to update the state in order to close the card creation form
  handleAddNewCard(cardText = '') {}

  // TODO: implement the handleCancelNewCard method.
  // Tips:
  // - Use the `this.setState` method to update the state in order to close the card creation form
  handleCancelNewCard() {}

  // TODO: implement the handleCreateNewCard method.
  // Tips:
  // - Use the `this.setState` method to update the state in order to open the card creation form
  handleCreateNewCard() {
    this.setState({ creatingNewCard: true });
  }

  // TODO: implement the handleEditCard method.
  // Tips:
  // - Use the `this.setState` method to update the text and tags values of the editing from
  handleEditCard(id, text, tags) {}

  // TODO: implement the handleCancelEdit method.
  // Tips:
  // - Use the `this.setState` method to reset and close the editing form
  handleCancelEdit() {}

  // TODO: implement the handleCopyCard method.
  // Tips:
  // - Call the `this.props.onCopyCard` function to clone a card
  // - Do not forget to reset and close the editing form
  handleCopyCard() {}

  // TODO: implement the handleArchiveCard method.
  // Tips:
  // - Call the `this.props.onRemoveCard` function to remove a card form the list
  // - Do not forget to reset and close the editing form
  handleArchiveCard() {}

  // TODO: implement the handleSaveCard method.
  // Tips:
  // - Call the `this.props.onEditCard` function to save changes on the card
  // - Do not forget to reset and close the editing form
  handleSaveCard(text) {}

  // TODO: implement the handleRemoveTag method.
  // Tips:
  // - Call the `this.props.onRemoveTag` function to remove a tag from a card
  handleRemoveTag(tagId) {}

  // TODO: implement the handleAddTag method.
  // Tips:
  // - Call the `this.props.onAddTag` function to add a tag to a card
  handleAddTag(text) {}

  // TODO: implement the renderHeader method to render the list header UI.
  // Tips:
  // - Should render a h3 tag for the list title
  // - Should render a Menu component
  // - Should render the number of cards in the list
  renderHeader() {
    return (
      <div className="cards-list-header">
        <div className="cards-list-title">
          { /* render the list title */ }
          { /* render the Menu component */ }
        </div>
        { /* render the number of cards in this list */ }
      </div>
    );
  }

  // TODO: implement the renderCards method to render the cards.
  // Tips:
  // - Iterate through this.props.cards to render each Card
  renderCards() {
    return (
      <ol className="cards">
        { /* render the cards */ }
      </ol>
    );
  }

  // TODO: implement the renderFooter method to render the list footer UI.
  // Tips:
  // - Should render either a Form component to create a new card
  // or a button to trigger the card creation mode (creatingNewCard)
  renderFooter() {}

  // TODO: render the CardsList UI.
  render() {
    return (
      <div className="cards-list">
        { /* render list header */ }
        { /* render cards */ }
        { /* render list footer */ }
        { /* render card editor */ }
      </div>
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
  title: PropTypes.string.isRequired,
  cards: PropTypes.objectOf(
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
