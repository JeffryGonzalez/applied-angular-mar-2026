import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { UserLinksApi } from './user-links-api';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, map, mergeMap, pipe, tap } from 'rxjs';
export type UserLinkPref = {
  id: string;
  ignored: boolean;
  pinned: boolean;
};

export const userLinksStore = signalStore(
  withEntities<UserLinkPref>(),
  withComputed((store) => {
    return {
      ignoredLinks: computed(() =>
        store
          .entities()
          .filter((link) => link.ignored)
          .map((link) => link.id),
      ),
      pinnedLinks: computed(() =>
        store
          .entities()
          .filter((link) => link.pinned)
          .map((link) => link.id),
      ),
    };
  }),
  withMethods((store) => {
    const api = inject(UserLinksApi);
    return {
      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            api.getLinks().pipe(tap((links) => patchState(store, setEntities(links)))),
          ),
        ),
      ),
      ignore: rxMethod<string>(
        pipe(
          mergeMap((link) =>
            api
              .addRemoved(link)
              .pipe(
                tap(() =>
                  patchState(store, updateEntity({ id: link, changes: { ignored: true } })),
                ),
              ),
          ),
        ),
      ),
      unignore: rxMethod<string>(
        pipe(
          mergeMap((link) =>
            api
              .unremove(link)
              .pipe(
                tap(() =>
                  patchState(store, updateEntity({ id: link, changes: { ignored: false } })),
                ),
              ),
          ),
        ),
      ),
      pin: rxMethod<string>(
        pipe(
          mergeMap((link) =>
            api
              .addPinned(link)
              .pipe(
                tap(() => patchState(store, updateEntity({ id: link, changes: { pinned: true } }))),
              ),
          ),
        ),
      ),
      unpin: rxMethod<string>(
        pipe(
          mergeMap((link) =>
            api
              .unpin(link)
              .pipe(
                tap(() =>
                  patchState(store, updateEntity({ id: link, changes: { pinned: false } })),
                ),
              ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
