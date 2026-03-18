import { Component, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { ResourceApiCreateModel } from '../types';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-resources-pages-add',
  imports: [PageLayout, FormField, FormRoot],
  template: `<app-ui-page title="Add a Link">
    <form [formRoot]="form">
      <div>
        <label for="title">Title</label
        ><input class="input" [formField]="form.title" id="title" type="text" />
      </div>
      <div>
        <label for="url">URL</label
        ><input class="input" id="url" [formField]="form.url" type="text" />
      </div>
      <button class="btn btn-primary" type="submit">Add Link</button>
    </form>
  </app-ui-page>`,
  styles: ``,
})
export class AddPage {
  #model = signal<ResourceApiCreateModel>({ title: '', url: '' });
  form = form(
    this.#model,
    (s) => {
      required(s.title, { message: 'We need a title for this link' });
      minLength(s.title, 3, { message: 'Title must be at least 3 characters long' });
      required(s.url, { message: 'We need a URL for this link' });
    },
    {
      submission: {
        action: async (form) => {
          const val = form().value();
          console.log(val);
        },
        onInvalid: (form) => {
          form().errorSummary()[0]?.fieldTree().focusBoundControl();
        },
      },
    },
  );
}
