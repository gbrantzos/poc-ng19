import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { DialogService } from '@poc/core/services/dialog.service';
import { LookupService } from '@poc/core/services/lookup.service';

@Component({
  selector: 'poc-home',
  templateUrl: './home.component.html',
  imports: [MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly title = 'Home - POC Project';
  readonly #dialog = inject(DialogService);

  lookupItems = toSignal(inject(LookupService).getLookup('Home'));

  async onDialog() {
    await this.#dialog.dialog(this.title, 'This is a text to be displayed...');
  }
}
