/* global document:true */

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App';

const container = document.getElementById('container');

const mount = () => {
  ReactDOM.render(<App />, container);
};

mount();
