import { ChangeDetectionStrategy, Component, computed, effect, input, output, viewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LookupItem } from '@poc/core/services/lookup.service';
import { DynamicFormComponent, FormDefinition } from '@poc/shared/components/dynamic-form/dynamic-form.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';

export type EditorAction = {
  type: 'save' | 'cancel' | 'delete';
  model?: unknown;
};

export type EditorDefinition = {
  title: {
    new?: string;
    edit?: string;
  };
  formDefinition: FormDefinition;
};

export type EditorData = {
  model: unknown | null;
  lookups: Record<string, readonly LookupItem[]>;
  form: FormGroup;
  isNew: boolean;
};

@Component({
  selector: 'poc-dynamic-editor',
  imports: [DynamicFormComponent, TitleComponent, MatButton, MatIcon],
  templateUrl: './dynamic-editor.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto px-3 py-2' }
})
export class DynamicEditorComponent {
  editorDefinition = input.required<EditorDefinition>();
  editorData = input.required<EditorData>();

  editorAction = output<EditorAction>();
  lookupRefresh = output<string>();

  editorForm = viewChild.required(DynamicFormComponent);

  constructor() {
    effect(() => {
      const model = this.editorData().model;
      const form = this.editorData().form;
      if (model) {
        form.patchValue(model);
      } else {
        form.reset();
      }
      this.editorForm().focus();
    });
  }

  protected icon = ['fa-regular', 'fa-pen-to-square'];
  protected title = computed(() => {
    const isNew = this.editorData().isNew;
    const definition = this.editorDefinition();

    return (isNew ? definition.title.new : definition.title.edit) ?? 'EDITOR TITLE NOT SET';
  });
}
