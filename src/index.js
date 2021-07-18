import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

