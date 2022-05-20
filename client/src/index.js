import 'react-hot-loader/patch';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

let root;

document.addEventListener('DOMContentLoaded', () => {
  if (!root) {
    // First page load
    root = hydrateRoot(document, <App />);
  } else {
    // Client side reload
    root.render();
  }
});

if (module.hot) {
  module.hot.accept((err) => console.log('Error hot reloading', err));
}
