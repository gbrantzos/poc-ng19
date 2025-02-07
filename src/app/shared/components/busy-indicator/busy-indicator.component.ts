import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poc-busy-indicator',
  imports: [],
  template: `
    <div id="text" class="text-center text-gray-200 absolute top-[50%] left-[50%] text-2xl">
      <i class="fa-solid fa-spinner fa-fw fa-5x fa-spin text-lime-100"></i>
      <p class="mt-8 animate-bounce">Waiting for data...</p>
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2000;
      cursor: pointer;
      backdrop-filter: blur(6px);
    }

    #text {
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusyIndicatorComponent {}
