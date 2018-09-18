import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor({store}) {
    super();
    this.store = store;
  }

  render() {
    return (
      <div className="App">
        <Provider store={this.store}>
          <HashRouter>
            <h1> Foodr App </h1>
          </HashRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
