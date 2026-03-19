import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { booksStore } from '../../data/books-store';

@Component({
  selector: 'ht-books-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `<app-ui-page title="Books">
    <p>Book Section</p>
  </app-ui-page>`,
  styles: ``,
})
export class HomePage {
  store = inject(booksStore);
  
}
