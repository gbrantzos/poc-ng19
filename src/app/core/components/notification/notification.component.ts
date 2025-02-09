import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationData, NotificationKind } from '@poc/core/services/notification.service';

@Component({
  selector: 'poc-notification',
  template: `
    <div class="flex items-center border border-gray-300 pr-4 w-full h-20 shadow-lg">
      <div class="flex items-center justify-center w-20 h-full" [ngClass]="colorPerClass[data.kind]">
        @switch (data.kind) {
          @case ('success') {
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <g id="surface1">
                <path
                  style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;"
                  d="M 12 2 C 17.523438 2 22 6.476562 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476562 22 2 17.523438 2 12 C 2 6.476562 6.476562 2 12 2 Z M 12 4 C 7.582031 4 4 7.582031 4 12 C 4 16.417969 7.582031 20 12 20 C 16.417969 20 20 16.417969 20 12 C 20 7.582031 16.417969 4 12 4 Z M 15.292969 8.292969 L 10 13.585938 L 8.707031 12.292969 C 8.316406 11.902344 7.683594 11.902344 7.292969 12.292969 C 6.902344 12.683594 6.902344 13.316406 7.292969 13.707031 L 9.292969 15.707031 C 9.683594 16.097656 10.316406 16.097656 10.707031 15.707031 L 16.707031 9.707031 C 17.097656 9.316406 17.097656 8.683594 16.707031 8.292969 C 16.316406 7.902344 15.683594 7.902344 15.292969 8.292969 Z M 15.292969 8.292969 " />
              </g>
            </svg>
          }
          @default {
            <svg
              class="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        }
      </div>
      <div class="px-6">
        <h5 class="font-semibold">{{ data.title }}</h5>
        <p class="text-sm">{{ data.message }}</p>
      </div>
      <button class="ml-auto" (click)="onClose()">
        <i class="w-4 h-4 fa-solid fa-xmark"></i>
      </button>
    </div>
  `,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  #sbRef = inject(MatSnackBarRef<NotificationComponent>);
  protected data = inject<NotificationData>(MAT_SNACK_BAR_DATA);

  protected colorPerClass: Record<NotificationKind, string> = {
    error: 'bg-rose-300',
    warning: 'bg-orange-300',
    info: 'bg-blue-300',
    success: 'bg-green-300'
  };

  onClose() {
    this.#sbRef.dismiss();
  }
}
