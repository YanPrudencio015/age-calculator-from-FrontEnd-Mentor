import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AgeCalc from './componentes/mainPage/age';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AgeCalc />
  </React.StrictMode>
);

