import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/globals.css';

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { startMockWorker } = await import('./mocks/browser');
  await startMockWorker();
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

void enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
