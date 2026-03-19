import { HttpResponse, delay, http } from 'msw';
import books from './books';

export const Books_Handlers = [
  http.get('/api/books', async () => {
    await delay();
    return HttpResponse.json(books);
  }),
];
