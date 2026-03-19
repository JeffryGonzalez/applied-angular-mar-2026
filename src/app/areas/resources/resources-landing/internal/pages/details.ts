import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { ResourceApiItemModel } from '../types';
import { userLinksStore } from '../../data/user-links-store';

@Component({
  selector: 'app-resources-pages-details',
  imports: [PageLayout],
  template: `<app-ui-page title="details">
    @if (details.hasValue()) {
      @let val = details.value();
      <div class="p-4">
        <h2 class="text-2xl font-bold">{{ val.title }}</h2>
        <a class="text-blue-500" href="{{ val.url }}">{{ val.url }}</a>
        <div>
          <p>
            Ignored:
            <label class="swap swap-flip text-xl">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" class="hidden" (change)="ignore()" />

              <div class="swap-on">😈</div>
              <div class="swap-off">😇</div>
            </label>
          </p>
          <p>
            Pinned:
            <label class="swap swap-flip text-xl">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" class="hidden" (change)="pin()" />

              <div class="swap-on">😈</div>
              <div class="swap-off">😇</div>
            </label>
          </p>
        </div>
      </div>
    }
  </app-ui-page>`,
  styles: ``,
})
export class DetailsPage {
  id = input.required<string>();
  store = inject(userLinksStore);
  details = httpResource<ResourceApiItemModel>(() => `/api/resources/${this.id()}/`);

  isLinkIgnored = computed(() => {
    const ignored = this.store.ignoredLinks();
    if (!ignored) {
      return false;
    }
    return ignored.includes(this.id());
  });

  isLinkPinned = computed(() => {
    const pinned = this.store.pinnedLinks();
    if (!pinned) {
      return false;
    }
    return pinned.includes(this.id());
  });

  pin() {
    if (this.isLinkPinned()) {
      this.store.unpin(this.id());
    } else {
      this.store.pin(this.id());
    }
  }
  ignore() {
    if (this.isLinkIgnored()) {
      this.store.unignore(this.id());
    } else {
      this.store.ignore(this.id());
    }
  }
}
