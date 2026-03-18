import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app-resources-pages-list',
  imports: [PageLayout, JsonPipe],
  template: `<app-ui-page title="Developer Resource List">
    <pre>{{ linksResource.value() | json }}</pre>
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  linksResource = httpResource(() => 'https://ang.hypertheory-labs.com/api/resources');
}
