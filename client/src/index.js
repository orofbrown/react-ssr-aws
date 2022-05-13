import 'react-hot-loader/patch';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';
import './index.css';

hydrateRoot(document.getElementById('root'), <App />);

if (module.hot) {
  module.hot.accept((err) => console.log('Error hot reloading', err));
}
