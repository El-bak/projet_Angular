import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { userHandlers } from './user.handlers';

export const worker = setupWorker(...handlers, ...userHandlers);
