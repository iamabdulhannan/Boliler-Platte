import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function startMockWorker() {
  await worker.start({
    onUnhandledRequest: 'bypass',
    quiet: false,
  });
  console.info('[MSW] Mock API ready. Demo login: admin@mailinator.com / admin1233');
}
