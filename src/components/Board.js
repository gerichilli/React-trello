import React, { Component } from 'react';
import update from 'react-addons-update';
import { _getNextNumber, _generateId } from '../utils';
// Icons
import { MdAdd as AddIcon } from 'react-icons/md';
// Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CardsList from './CardsList';
import Form from './Form';

import data from '../data';
import Button from './Button';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: {},
      cards: {},
      listOrder: [],
      newListText: '',
      creatingNewList: false,
      openMenuId: null,
    };

    this.cardRef = React.createRef();

    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleCancelCreateList = this.handleCancelCreateList.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.handleRemoveAllCards = this.handleRemoveAllCards.bind(this);
    this.handleCopyCard = this.handleCopyCard.bind(this);
    this.handleCopyList = this.handleCopyList.bind(this);
    this.handleMoveAllCards = this.handleMoveAllCards.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.setState ({ 
      lists: data.lists,
      cards: data.cards,
      listOrder: data.listOrder
    })
  }

  handleCreateList() {
    this.setState({ creatingNewList: true })
  }

  handleCancelCreateList() {
    this.setState({ creatingNewList: false });
  }

  handleAddList(title = '') {
    if(!title) return;

    const newListID = _generateId();

    this.setState({
      lists: {
        ...this.state.lists, 
        [newListID]: {
          id: newListID, 
          title: title,
          cardIds: []
        }
      },
      listOrder: [...this.state.listOrder, newListID],
      newListText: '',
      creatingNewList: false,
    })
  }

  handleRemoveList(listId) {
    const updateCards = Object.assign({}, this.state.cards);
    const updateLists = Object.assign({}, this.state.lists);

    // - Delete all cards from the list
    this.state.lists[listId].cardIds.forEach(cardId => delete updateCards[cardId]);
    // - Delete list itself
    delete updateLists[listId];

    this.setState({
      lists: updateLists,
      cards: updateCards,
      listOrder: this.state.listOrder.filter(listOr => listOr !== listId)
    })
  }

  handleAddCard(listId, description = ''){
    if(!description) return;

    const newCardID = _generateId();

    this.setState({
      lists: {
        ...this.state.lists,
        [listId]: {
          ...this.state.lists[listId],
          cardIds: [...this.state.lists[listId].cardIds, newCardID]
        }
      },
      cards: {
        ...this.state.cards, 
        [newCardID]: {
          id: newCardID,
          number: _getNextNumber(this.state.cards),
          description: description,
          tags: []
        }
      }
    })
  }

  handleRemoveCard(listId, cardId) {
    // - Delete card
    const updateCards = Object.assign({}, this.state.cards);
    delete updateCards[cardId];

    // - Remove card Id from the corresponding list
    this.setState({
      lists: {
        ...this.state.lists,
        [listId]: {
          ...this.state.lists[listId],
          cardIds: this.state.lists[listId].cardIds.filter(card => card !== cardId)
        }
      },
      cards: updateCards,
    })
  }

  handleRemoveAllCards(listId) {
    const updateCards = Object.assign({}, this.state.cards);
    this.state.lists[listId].cardIds.forEach(cardId => delete updateCards[cardId]);

    this.setState({
      lists: {
        ...this.state.lists,
        [listId]: {
          ...this.state.lists[listId],
          cardIds: []
        }
      },
      cards: updateCards,
      openMenuId: null
    })

  }

  handleCopyCard(listId, cardId) {
    const newCardId = _generateId();

    this.setState({
      lists: {
        ...this.state.lists,
        [listId]: {
          ...this.state.lists[listId],
          cardIds: [...this.state.lists[listId].cardIds, newCardId]
        }
      },
      cards: {
        ...this.state.cards, 
        [newCardId]: {
          ...this.state.cards[cardId],
          id: newCardId,
          number: _getNextNumber(this.state.cards)
        }
      }
    })
  }
  
  handleCopyList(listId) {
    // - Copy all cards from list to clone
    const [cloneCards] = this.state.lists[listId].cardIds.map(cardId => {
      const cloneCardId = _generateId();
      // cloneCards[cloneCardId] = Object.assign({}, this.state.cards[cardId]);
      // cloneCards[cloneCardId].id = cloneCardId;
      // cloneCards[cloneCardId].number = _getNextNumber({...this.state.cards, ...cloneCards});
      return {[cloneCardId]: {
        ...this.state.cards[cardId],
        id: cloneCardId,
        number: _getNextNumber(this.state.cards)
      }}
    })

    // - Create a new list and add all the cloned cards
    const newListId = _generateId();

    this.setState({
      lists: {
        ...this.state.lists, 
        [newListId]: {
          ...this.state.lists[listId],
          id: newListId,
          title: `(Copy) ${this.state.lists[listId].title}`,
          cardIds: Object.keys(cloneCards),
        }
      },
      cards: {...this.state.cards, ...cloneCards},
      listOrder: [...this.state.listOrder, newListId],
      openMenuId: null
    })
  }

  handleMoveAllCards(listId) {
    const updateLists = Object.assign({}, this.state.lists);

    for (const id in updateLists) {
      if (id === listId) updateLists[id].cardIds = Object.keys(this.state.cards);
      else updateLists[id].cardIds = [];
    }

    this.setState({
      lists: updateLists,
      openMenuId: null
    })
  }

  handleToggleMenu(listId) {
    if(this.state.openMenuId !== listId) this.setState({ openMenuId: listId });
    if(this.state.openMenuId === listId) this.setState({ openMenuId: null });
  }

  handleEditCard(cardId, description = '') {
    this.setState({ 
      cards: {
        ...this.state.cards,
        [cardId]: {
          ...this.state.cards[cardId],
          description: description
        }
      }
    })
  }

  handleRemoveTag(cardId, tagId) {
    this.setState({
      cards: {
        ...this.state.cards,
        [cardId]: {
          ...this.state.cards[cardId],
          tags: this.state.cards[cardId].tags.filter((_, index) => index !== tagId)
        }
      }
    })
  }

  handleAddTag(cardId, text = '') {
    this.setState({
      cards: {
        ...this.state.cards,
        [cardId]: {
          ...this.state.cards[cardId],
          tags: [...this.state.cards[cardId].tags, text]
        }
      }
    })
  }

  handleDragEnd({ destination, source, draggableId, type }) {
    // - Check if the element has been dropped inside the droppable context (using destination). If not, ignore droppping
    if(!destination) return;
    // - Check if the element has been dropped in a new location (using droppableId from destination and source). If not, ignore droppping
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if(type === 'list') {
      const list = this.state.listOrder;
      list.splice(source.index, 1);
      list.splice(destination.index, 0, draggableId);

      this.setState({ listOrder: list });
    } 

    if(type === 'card') {
      const start = this.state.lists[source.droppableId];
      const end = this.state.lists[destination.droppableId];

      if(start === end) {
        const newCardIds = start.cardIds;
        newCardIds.splice(source.index, 1);
        newCardIds.splice(destination.index, 0, draggableId);
  
        const newList = {...start, cardIds: newCardIds}
        const newState = {...this.state, lists: {...this.state.lists}, [newList.id]: newList}
  
        this.setState(newState);
        return;
      }

      const startCardIds = start.cardIds;
      startCardIds.splice(source.index, 1);
      const newStart = {
        ...start, 
        cardIds: startCardIds
      }

      const endCardIds = end.cardIds;
      endCardIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...end, 
        cardIds: endCardIds
      }
      
      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd
        }
      }

      this.setState(newState);
    }
  }

  renderLists() {
    const cardsLists = this.state.listOrder.map((cardList, index) => {
      const listData = this.state.lists[cardList];
      const listCardsIds = listData.cardIds;
      const listCards = listCardsIds.map(id => this.state.cards[id])

      return (
        <CardsList
        key={listData.id}
        index={index}
        id={listData.id}
        title={listData.title}
        cards={listCards}
        isMenuOpen={this.state.openMenuId === listData.id}
        onToggleMenu={this.handleToggleMenu}
        onAddCard={this.handleAddCard}
        onRemoveCard={this.handleRemoveCard}
        onRemoveList={this.handleRemoveList}
        onCopyList={this.handleCopyList}
        onRemoveAllCards={this.handleRemoveAllCards}
        onMoveAllCards={this.handleMoveAllCards}
        onCopyCard={this.handleCopyCard}
        onEditCard={this.handleEditCard}
        onAddTag={this.handleAddTag}
        onRemoveTag={this.handleRemoveTag}
        />
      )
    })

    return (
      <Droppable 
      droppableId='droppable-1'
      direction = 'horizontal'
      type="list"
      >
        {provided => 
        <ul 
        className="board-lists"
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
          {cardsLists}
          {provided.placeholder}
        </ul>
        }
      </Droppable>
    );
  }

  renderNewList() {
    if(this.state.creatingNewList) {
      return (
        <Form
        type="list"
        buttonText="Add List"
        variant="success"
        placeholder="Enter a title for this list..."
        onClickCancel={this.handleCancelCreateList}
        onClickSubmit={this.handleAddList}
        />
      )
    } else {
      return (
        <Button 
          icon={<AddIcon />}
          variant="addList"
          text="Add a new list"
          onButtonClick={this.handleCreateList}
        />
      )
    }
  }

  render() {
    return (
      <div className="board">
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {this.renderLists()}
        </DragDropContext>
        { this.renderNewList() }
      </div>
    );
  }
};

export default Board;
