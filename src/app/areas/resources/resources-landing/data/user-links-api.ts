import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserLinkPref } from './user-links-store';

export class UserLinksApi {
  #client = inject(HttpClient);

  getLinks() {
    return this.#client.get<UserLinkPref[]>('/api/user/links');
  }

  addRemoved(id: string) {
    return this.#client.put(`/api/user/ignored-links/${id}`, {});
  }

  unremove(id: string) {
    return this.#client.delete(`/api/user/ignored-links/${id}`);
  }

  addPinned(id: string) {
    return this.#client.put(`/api/user/pinned-links/${id}`, {});
  }
  unpin(id: string) {
    return this.#client.delete(`/api/user/pinned-links/${id}`);
  }
}
