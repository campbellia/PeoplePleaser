import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const rootElement = document.getElementById('app');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
