import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Client/App';
import './Client/Pages/Main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
