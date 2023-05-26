import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/styles.scss';
import App from './components/APP/App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
    <App/>
    </Router>
  </React.StrictMode>
);


