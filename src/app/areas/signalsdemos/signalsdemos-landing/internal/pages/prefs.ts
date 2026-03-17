import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app-demos-pages-counter-prefs',
  imports: [PageLayout],
  template: `<app-ui-page title="counter-prefs">
    <div class="join">
      <button disabled class="btn join-item">1</button>
      <button class="btn join-item">3</button>
      <button class="btn join-item">5</button>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class PrefsPage {}
