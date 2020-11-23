
import React, { Component } from 'react';
import List from './composition/List';
import './App.css';
import STORE from './composition/STORE';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4) // (2 value random letter/number) random number turned to string, in base 36 to represent numeric value, only display from values 2 to 4 of number string
    + Math.random().toString(36).substring(2, 4); // (2 value random letter/number)
  return {
    id,
    title: `Random Card ${id}`, // random card id printed to newly created care (ex: 'r1x1')
    content: 'lorem ipsum', 
  }
}

// remove key value pairs from an object (omit function returns new object)
// why do we need this?
function omit(obj, keyToOmit) {
  // Object.entries method returns an array of objects string-keyed props (key, value) pairs.
  return Object.entries(obj).reduce( // executes reducer function that i define
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value}, // if key exists it equal keyToOmit, else it equals newObj
    {}
  );
}


class App extends Component {

  state = {
    store: STORE,
  };

  handleDeleteCard = (cardId) => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  handleAddCard = (listId) => {
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
	return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;

