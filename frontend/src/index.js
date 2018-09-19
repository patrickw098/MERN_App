import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import configureStore from './store/store';

import App from './App';
import registerServiceWorker from './registerServiceWorker';


document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore();
    
    window.store = store;

    ReactDOM.render(<App store={store} />, document.getElementById('root'));
    registerServiceWorker();
})
