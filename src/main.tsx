import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { readInitialMotionPreference } from './stores/useUniverseStore';
import './styles/index.css';

document.documentElement.dataset.motion = readInitialMotionPreference() ? 'on' : 'off';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
