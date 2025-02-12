import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LookupService } from '@poc/core/services/lookup.service';

@Component({
  selector: 'poc-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  title = 'Home - POC Project';
  lookupItems = toSignal(inject(LookupService).getLookup('Home'));
}
