import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { SectionLayout, SectionLink } from '@ht/shared/ui-common/layouts/section';
import { authStore } from '@ht/shared/util-auth/store';

@Component({
  selector: 'ht-resources-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionLayout],
  template: `<app-ui-section-layout title="Developer Resources" [links]="links()" />`,
  styles: ``,
})
export class Home {
  store = inject(authStore);
  links = computed<SectionLink[]>(() => {
    const base: SectionLink[] = [
      {
        title: 'List of Links',
        path: 'list',
      },
    ];

    if (this.store.isLoggedIn()) {
      base.push({
        title: 'Add a Link',
        path: 'add',
      });
    }

    base.push({
      title: 'Add a Link Alt',
      path: 'add-2',
    });

    return base;
  });
}
