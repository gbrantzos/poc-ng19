import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LookupService } from '@poc/core/services/lookup.service';
import { CUSTOMER_FORM } from '@poc/definitions/customers.form.definition';
import { createCustomerForm } from '@poc/features/customers/components/customer-editor/customer-form';
import { Lookups } from '@poc/features/customers/customers.providers';
import { Customer } from '@poc/features/customers/domain/customer';
import { DynamicFormComponent } from '@poc/shared/components/dynamic-form/dynamic-form.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';

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
  styles: `
    .mat-icon:hover {
      color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class CustomerEditorComponent {
  #lookups = inject(LookupService);

  editorClick = output<'save' | 'cancel' | 'delete'>();

  customerCategories = toSignal(this.#lookups.getLookup(Lookups.Categories));

  protected formDefinition = CUSTOMER_FORM;
  protected form = createCustomerForm();
  model = input<Customer | null>(null);

  constructor() {
    effect(() => {
      const model = this.model();
      if (model) {
        this.form.patchValue(model);
      }
    });
  }

  onRefresh = () => this.#lookups.refresh(Lookups.Categories);
}
