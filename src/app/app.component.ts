import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { BusyIndicatorService } from '@poc/core/services/busy-indicator.service';
import { BusyIndicatorComponent } from '@poc/shared/components/busy-indicator/busy-indicator.component';

@Component({
  selector: 'poc-root',
  imports: [RouterOutlet, BusyIndicatorComponent],
  template: `
    <router-outlet />
    @if (isBusy()) {
      <poc-busy-indicator />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  service = inject(BusyIndicatorService);
  isBusy = toSignal(this.service.indicatorState);
}
