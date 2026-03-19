import { HttpHandler } from 'msw';
import authHandler from './auth/loggedInHandler';
import { resourceHandlers } from './resources/handler';
import { userLinkHandler } from './user-links-handler';

export const handlers: HttpHandler[] = [...authHandler, ...resourceHandlers, ...userLinkHandler];
