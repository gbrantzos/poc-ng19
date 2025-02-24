import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LookupItem } from '@poc/core/services/lookup.service';
import { CUSTOMER_FORM } from '@poc/definitions/customers.form.definition';
import { createCustomerForm } from '@poc/features/customers/components/customer-editor/customer-form';
import { Customer } from '@poc/features/customers/domain/customer';
import { DynamicFormComponent } from '@poc/shared/components/dynamic-form/dynamic-form.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';

export type CustomerEditorAction = {
  type: 'save' | 'cancel' | 'delete';
  model?: Customer;
};

@Component({
  selector: 'poc-customer-editor',
  imports: [
    TitleComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    DynamicFormComponent
  ],
  templateUrl: './customer-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto px-3 py-2' }
})
export class CustomerEditorComponent {
  lookups = input<Record<string, readonly LookupItem[]>>({});
  editorAction = output<CustomerEditorAction>();
  lookupRefresh = output<string>();

  model = input<Customer | null>(null);

  protected formDefinition = CUSTOMER_FORM;
  protected form = createCustomerForm();
  protected isLoading = computed(() => {
    const model = this.model();

    return !model;
  });

  constructor() {
    effect(() => {
      const model = this.model();
      if (model) {
        this.form.patchValue(model);
      }
    });
  }
}
