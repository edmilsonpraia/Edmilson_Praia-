import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;

const AppTree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If react-snap has pre-rendered content, hydrate it;
// otherwise do a normal client-side render.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, AppTree);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(AppTree);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
