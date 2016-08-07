import React from 'react';
import {Provider} from 'react-redux';
import { render } from 'react-dom';
import Oracle from './components/Oracle';
import configureStore from './store/store.js';

import './css';

var store = configureStore();

const root = (
  <Provider store={store}>
    <Oracle/>
  </Provider>
);

let target = document.createElement('div');
target.setAttribute('id', 'app-oracle');
document.body.appendChild(target);

render(root, document.getElementById('app-oracle'));
