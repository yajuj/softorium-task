import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from './context/context';
import ErrorBoundary from './error-boundary/error-boundary';

ReactDOM.render(
  <ContextProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ContextProvider>,

  document.getElementById('root')
);
