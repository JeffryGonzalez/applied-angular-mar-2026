import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app-resources-pages-list',
  imports: [PageLayout],
  template: `<app-ui-page title="Developer Resource List">
    @if (linksResource.isLoading()) {
      <span class="loading loading-spinner text-primary"></span>
      <span class="loading loading-spinner text-secondary"></span>
      <span class="loading loading-spinner text-accent"></span>
      <span class="loading loading-spinner text-neutral"></span>
      <span class="loading loading-spinner text-info"></span>
      <span class="loading loading-spinner text-success"></span>
      <span class="loading loading-spinner text-warning"></span>
      <span class="loading loading-spinner text-error"></span>
    } @else {
      <div class="grid grid-cols-4 gap-4">
        @for (link of linksResource.value(); track link.id) {
          <div class="card bg-base-100 card-xs shadow-sm">
            <div class="card-body">
              <h2 class="card-title">{{ link.title }}</h2>

              <div class="justify-end card-actions">
                <a class="btn btn-primary" [href]="link.url" target="_blank">Visit</a>
              </div>
            </div>
          </div>
        } @empty {
          <div class="alert alert-error">No resources found.</div>
        }
      </div>
    }
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  linksResource = httpResource<{ id: string; title: string; url: string }[]>(
    () => 'https://ang.hypertheory-labs.com/api/resources',
  );
}
