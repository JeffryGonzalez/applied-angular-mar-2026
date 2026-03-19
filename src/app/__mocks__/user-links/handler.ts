import { UserLinkPref } from '@ht/resources/resources-landing/data/user-links-store';
import { http, delay, HttpResponse } from 'msw';

let userLinks: UserLinkPref[] = [];

export const userLinkHandler = [
  http.get('/api/user/links', async () => {
    await delay();
    return HttpResponse.json(userLinks);
  }),

  http.put('/api/user/ignored-links/:id', async ({ request, params }) => {
    await delay();
    const id = params['id'];
    const existing = userLinks.find((u) => u.id === id);
    if (existing) {
      existing.ignored = true;
      return HttpResponse.json(existing);
    }

    const newEntry: UserLinkPref = {
      id: crypto.randomUUID(),
      ignored: true,
      pinned: false,
    };
    userLinks = [...userLinks, newEntry];
    return HttpResponse.json(newEntry, { status: 201 });
  }),

  http.delete('/api/user/ignored-links/:id', async ({ params }) => {
    await delay();
    const id = params['id'];
    const existing = userLinks.find((u) => u.id === id);
    if (existing) {
      existing.ignored = false;
    }
    return HttpResponse.json({}, { status: 204 });
  }),

  http.put('/api/user/pinned-links/:id', async ({ params }) => {
    await delay();
    const id = params['id'];
    const existing = userLinks.find((u) => u.id === id);
    if (existing) {
      existing.pinned = true;
      return HttpResponse.json(existing);
    }
    const newEntry: UserLinkPref = {
      id: crypto.randomUUID(),
      ignored: false,
      pinned: true,
    };
    userLinks = [...userLinks, newEntry];
    return HttpResponse.json(newEntry, { status: 201 });
  }),

  http.delete('/api/user/pinned-links/:id', async ({ params }) => {
    await delay();
    const id = params['id'];
    const existing = userLinks.find((u) => u.id === id);
    if (existing) {
      existing.pinned = false;
    }
    return HttpResponse.json({}, { status: 204 });
  }),
];
