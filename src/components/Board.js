import React, { Component } from 'react';
import { _getNextNumber, _generateId } from '../utils';
// Icons
import { IoMdAdd as AddIcon } from 'react-icons/io';
// Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CardsList from './CardsList';
import Form from './Form';

import data from '../data';

class Board extends Component {
  constructor(props) {
    super(props);

    // Board state
    this.state = {
      lists: {},
      cards: {},
      listOrder: [],
      newListText: '',
      creatingNewList: false,
      openMenuId: null,
    };

    // TODO: Bind your class methods here
    // ...
  }

  // TODO: implement the componentDidMount lifecycle method to fetch data and init the component state.
  // Tips:
  // - Use the `this.setState` method to update the component state
  componentDidMount() {}

  // TODO: implement the handleAddList method to add a new list to the board.
  // Tips:
  // - Check if the list title is not an empty string. Do not create the list otherwise
  // - Use the `_generateId` function to generate a unique Id for the new list
  // - Add the new list
  // - Use the `this.setState` method to update the state (lists, listOrder, newListText, creatingNewList)
  // - Reset the `newListText` and `creatingNewList` state values as well to cleanup and close the form
  handleAddList(title = '') {}

  // TODO: implement the handleRemoveList method to remove a list from the board.
  // Tips:
  // - Delete all cards from the list
  // - Delete list itself
  // - Use the `this.setState` method to update the state (lists, cards, listOrder)
  handleRemoveList(listId) {}

  // TODO: implement the handleAddCard method to add a card to a list.
  // Tips:
  // - Check if the card description is not an empty string. Do not create the card otherwise
  // - Use the `_generateId` function to generate a unique Id for the new card
  // - Use the `_getNextNumber` function to get the new card number
  // - Add the new card
  // - Use the `this.setState` method to update the state (lists, cards)
  handleAddCard(listId, description = '') {}

  // TODO: implement the handleRemoveCard method to remove a card from a list.
  // Tips:
  // - Delete card
  // - Remove card Id from the corresponding list
  // - Use the `this.setState` method to update the state (lists, cards)
  handleRemoveCard(listId, cardId) {}

  // TODO: implement the handleRemoveAllCards method to remove all cards from a list.
  // Tips:
  // - Delete all cards from the corresponding list
  // - Remove card Ids from the list
  // - Use the `this.setState` method to update the state (lists, cards, openMenuId)
  // - Close the opened menu by reseting the openMenuId state value
  handleRemoveAllCards(listId) {}

  // TODO: implement the handleCopyCard method to copy a card from a list to another.
  // Tips:
  // - Create card copy
  // - Use the `_generateId` function to generate a unique Id for the new card
  // - Use the `_getNextNumber` function to get the new card number
  // - Add it to the list
  // - Use the `this.setState` method to update the state (lists, cards)
  handleCopyCard(listId, cardId) {}

  // TODO: implement the handleCopyList method to clone an entire list.
  // Tips:
  // - Copy all cards from list to clone
  // - Use the `_generateId` function to generate a unique Id for every cloned cards
  // - Use the `_getNextNumber` function to get a new card number for every cloned cards
  // - Create a new list and add all the cloned cards
  // - Use the `_generateId` function to generate a unique Id for the new list
  // - Edit the new list title to append '(Copy) - ' to it
  // - Use the `this.setState` method to update the state (lists, cards, listOrder, openMenuId)
  // - Close the opened menu by reseting the openMenuId state value
  handleCopyList(listId) {}

  // TODO: implement the handleMoveAllCards method to move all cards to a list.
  // Tips:
  // - Update all the lists
  // - The target list should get all the cards. The other lists should be emptied
  // - Use the `this.setState` method to update the state (lists, openMenuId)
  // - Close the opened menu by reseting the openMenuId state value
  handleMoveAllCards(listId) {}

  // TODO: implement the handleToggleMenu method to toggle the corresponding list menu.
  // Tips:
  // - Use the `this.setState` method to update the state (openMenuId)
  handleToggleMenu(listId) {}

  // TODO: implement the handleEditCard method to update the card description.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleEditCard(cardId, description = '') {}

  // TODO: implement the handleRemoveTag method to remove a tag from a card.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleRemoveTag(cardId, tagId) {}

  // TODO: implement the handleAddTag method to add a tag to a card.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleAddTag(cardId, text = '') {}

  // [BONUS]: implement the handleDragEnd method to persist list and card reordering
  // Tips:
  // - Check if the element has been dropped inside the droppable context (using destination). If not, ignore droppping
  // - Check if the element has been dropped in a new location (using droppableId from destination and source). If not, ignore droppping
  // - Handle both type of draggable (list and card) by checking the value of type
  // - Re-order cards inside the list if type equals 'card'. Use the `this.setState` method to update the state (lists)
  // - Re-order lists inside the board if type equals 'list'. Use the `this.setState` method to update the state (listOrder)
  handleDragEnd({ destination, source, draggableId, type }) {}

  // TODO: implement the renderLists method to render the board lists UI.
  // Tips:
  // - Iterate through the listOrder state array to render each list of cards (CardsList)
  // - Pass the necessary methods to the CardsList component to handle all actions
  //
  // [BONUS]:
  // - Wrap the board lists inside the <Droppable> component
  // --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
  // - Add the droppableId prop to it
  // - Add the direction prop to it (should be 'horizontal')
  // - Add the type prop to it (should be 'list')
  // - Add the children function that returns your board lists component and bind everything together
  // --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#children-function
  renderLists() {
    return (
      <div className="board-lists">
        { /* render the lists */ }
      </div>
    );
  }

  // TODO: implement the renderNewList method to render the list creation form.
  // Tips:
  // - Render a Form component in creation mode to let the user enter the new list title
  // - Otherwise, render a button to trigger the creation mode (creatingNewList)
  renderNewList() {}

  // TODO: render the Board UI.
  //
  // [BONUS]:
  // - Wrap the board inside the <DragDropContext> component
  // --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md
  // - Add the onDragEnd prop to the <DragDropContext> component
  render() {
    return (
      <div className="board">
        { /* render the lists */ }
        { /* render the list creation form */ }
      </div>
    );
  }
};

export default Board;
