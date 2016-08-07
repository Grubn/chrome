import React from 'react';
import I from 'immutable';
import {Provider} from 'react-redux';
import { render } from 'react-dom';
import Oracle from './components/Oracle';
import configureStore from './store/store.js';

import './css';

// DO NOT DELETE - KENNET
var rootContent = document.body.innerHTML.replace(/(<div\s*id="app-oracle.*<\/div>)|(<style((.*|[\n\r\s\t])*)<\/style\s*>)|(<script((.*|[\n\r\s\t])*)<\/script\s*>)/,'');  // DO NOT DELETE - KENNET
// DO NOT DELETE - KENNET
console.log('Main root content: ', rootContent);
var store = configureStore(I.Map({}));

const root = (
  <Provider store={store}>
    <Oracle rootContent={rootContent}/>
  </Provider>
);

let target = document.createElement('div');
target.setAttribute('id', 'app-oracle');
document.body.appendChild(target);

render(root, document.getElementById('app-oracle'));
