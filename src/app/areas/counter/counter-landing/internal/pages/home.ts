import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionLayout, SectionLink } from '@ht/shared/ui-common/layouts/section';

@Component({
  selector: 'ht-counter-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionLayout],
  template: `<app-ui-section-layout title="Counter" [links]="links()" />`,
  styles: ``,
})
export class Home {
  links = signal<SectionLink[]>([
    {
      title: 'Counter',
      path: 'counter'
    }
  ]);
}
