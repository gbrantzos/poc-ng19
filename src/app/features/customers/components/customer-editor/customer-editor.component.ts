import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LookupService } from '@poc/core/services/lookup.service';
import { Lookups } from '@poc/features/customers/customers.providers';
import { TitleComponent } from '@poc/shared/components/title/title.component';

@Component({
  selector: 'poc-customer-editor',
  imports: [TitleComponent, MatButton, MatIcon],
  templateUrl: './customer-editor.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class CustomerEditorComponent {
  #lookups = inject(LookupService);

  editorClick = output<'save' | 'cancel' | 'delete'>();

  customerCategories = toSignal(this.#lookups.getLookup(Lookups.Categories));

  onRefresh = () => this.#lookups.refresh(Lookups.Categories);
}
