import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@vaadin/vaadin-date-picker"


declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 'vaadin-date-picke': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
      // 'vaadin-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>; // Web component extended from input
      'vaadin-date-picker': any
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
