import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

//import renderer from 'react-test-renderer';

describe('list component', () => {
  
  it('renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<List />, div); // don't understand how to pass props through
    ReactDOM.unmountComponentAtNode(div);
  });
  
});