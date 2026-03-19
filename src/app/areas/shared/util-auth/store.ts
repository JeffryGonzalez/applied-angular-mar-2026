import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { AuthUser } from './internal/types';

export const authStore = signalStore(
  withProps(() => {
    return {
      authResource: httpResource<AuthUser>(() => '/api/user/'),
    };
  }),
  withMethods(() => {
    return {
      login: (redirectUrl: string) => {
        console.log('Logging in, redirect to:', redirectUrl);
      },
      logout: (redirectUrl: string) => {
        console.log('Logging out, redirect to:', redirectUrl);
      },
    };
  }),
  withComputed((store) => {
    return {
      isLoggedIn: computed(() => {
        if (store.authResource.value()) {
          return true;
        }
        if (store.authResource.error() || store.authResource.isLoading()) {
          return false;
        }
        return false;
      }),
    };
  }),
);
