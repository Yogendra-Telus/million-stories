import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ErrorBoundary from './utility/error/ErrorBoundary';
import App from './App';

const app = (
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>
);

ReactDOM.render(app, document.getElementById('root'));
