import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoresProvider } from './components/storesProvider';
import { stores } from './stores';

ReactDOM.render(
  <StoresProvider stores={stores}>
    <App />
  </StoresProvider>,
  document.getElementById('root')
);

