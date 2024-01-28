import React from 'react';
import { createRoot } from 'react-dom/client';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Login />
    </>
  );
}

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);
