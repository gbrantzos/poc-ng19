import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BusyIndicatorService } from '@poc/core/services/busy-indicator.service';

@Component({
  selector: 'poc-busy-indicator',
  imports: [],
  template: `
    <div class="flex flex-col justify-center items-center h-screen pb-24">
      <div class="flex-auto"></div>
      <div class="border-orange-500 bg-orange-100 min-w-[500px] rounded-md opacity-80 flex gap-12">
        <div class="flex pl-12 pt-16 pb-8 text-rose-500">
          <i class="fa-regular fa-face-frown-open fa-fw fa-5x animate-bounce"></i>
        </div>
        <div class="flex flex-col pr-12 py-12">
          <p class="text-2xl mb-3">Waiting for data</p>
          <p>The operation seems to take longer than expected...</p>
          <p (click)="service.cancel()" (keydown)="service.cancel()" class="link" role="button" tabindex="0">Cancel</p>
        </div>
      </div>
    </div>
  `,
  styles: `
    #text {
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fixed h-full w-full top-0 left-0 bg-black bg-opacity-50 backdrop-blur-[2px] cursor-pointer z-[2000]' }
})
export class BusyIndicatorComponent {
  service = inject(BusyIndicatorService);
}
