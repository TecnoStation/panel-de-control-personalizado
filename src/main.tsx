import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Aseguramos que el elemento root tenga un estilo inicial
root.style.backgroundColor = 'white';
root.style.minHeight = '100vh';
root.style.width = '100%';

createRoot(root).render(<App />);