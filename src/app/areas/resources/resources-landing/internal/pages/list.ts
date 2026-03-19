import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { ExtractHostPipe } from '../../../util-pipes/extract-host';
import { ResourceApiItemModel } from '../types';
import { Card } from '../widgets/card';
import { RouterLink } from '@angular/router';
import { userLinksStore } from '../../data/user-links-store';

@Component({
  selector: 'app-resources-pages-list',
  imports: [PageLayout, ExtractHostPipe, Card, RouterLink],
  template: `<app-ui-page title="Developer Resource List">
    @if (linksResource.isLoading()) {
      <span class="loading loading-spinner text-primary"></span>
    } @else {
      <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        @for (link of adornedLinks(); track link.id) {
          @if (link.ignored === false) {
            <app-resources-widgets-card [title]="link.title">
              @if (link.pinned) {
                <span class="badge badge-success rounded-lg">Pinned</span>
              }
              <a class="btn btn-primary btn-xs" [href]="link.url" target="_blank"
                >Visit {{ link.url | extractHost: true }}</a
              >
              <a class="btn btn-primary btn-xs" [routerLink]="[link.id]">Details</a>
            </app-resources-widgets-card>
          }
        } @empty {
          <div class="alert alert-error">No resources found.</div>
        }
      </div>
    }
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  linksResource = httpResource<ResourceApiItemModel[]>(() => '/api/resources');

  userLinkStore = inject(userLinksStore);

  adornedLinks = computed(() => {
    const links = this.linksResource.value() || [];
    return links.map((link) => {
      const ignored = this.userLinkStore.ignoredLinks().includes(link.id);
      const pinned = this.userLinkStore.pinnedLinks().includes(link.id);
      return { ...link, ignored, pinned };
    });
  });
}
