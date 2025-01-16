import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Aseguramos que el elemento root ocupe todo el viewport
root.style.width = '100vw';
root.style.minHeight = '100vh';
root.style.margin = '0';
root.style.padding = '0';
root.style.backgroundColor = 'white';
root.style.display = 'block';
root.style.overflow = 'hidden';

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);