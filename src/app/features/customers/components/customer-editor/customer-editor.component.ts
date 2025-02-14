import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LookupService } from '@poc/core/services/lookup.service';
import { Lookups } from '@poc/features/customers/customers.providers';
import { TitleComponent } from '@poc/shared/components/title/title.component';

@Component({
  selector: 'poc-customer-editor',
  imports: [TitleComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
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

  onRefresh = () => this.#lookups.refresh(Lookups.Categories);
}
