import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { DialogData, DialogKind } from '@poc/core/services/dialog.service';

@Component({
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle, NgClass],
  selector: 'poc-dialog',
  template: `
    <div mat-dialog-title class="flex flex-row" [ngClass]="headerColorPerKind[data.kind]">
      <h4>{{ data.title }}</h4>
      <div class="flex-auto"></div>
      <i
        class="fa-solid fa-xmark text-2xl pt-2 text-gray-400 hover:text-gray-700 cursor-pointer"
        (click)="dialogRef.close()"
        (keydown)="dialogRef.close()"
        role="button"
        tabindex="0">
      </i>
    </div>
    <mat-dialog-content>
      <div class="flex flex-row gap-4 pt-4">
        <i class="fa-fw fa-6x" [ngClass]="iconPerKind[data.kind]"></i>
        <p class="pl-2" [innerHTML]="data.message"></p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions class="border border-t-2 border-t-gray-200">
      @if (data.showCancel) {
        <button
          mat-button
          class="core bg-white text-gray-700 border border-solid"
          [ngClass]="borderColorPerKind[data.kind]"
          (click)="onCancelClick()">
          Cancel
        </button>
      }
      <button
        mat-flat-button
        class="core"
        [ngClass]="[buttonColorPerKind[data.kind], hoverColorPerKind[data.kind]]"
        [mat-dialog-close]="true"
        cdkFocusInitial>
        OK
      </button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  protected headerColorPerKind: Record<DialogKind, string> = {
    error: 'bg-rose-100',
    warning: 'bg-orange-100',
    info: 'bg-blue-100',
    success: 'bg-green-100'
  };

  protected buttonColorPerKind: Record<DialogKind, string> = {
    error: 'bg-rose-700',
    warning: 'bg-orange-700',
    info: 'bg-blue-700',
    success: 'bg-green-700'
  };

  protected borderColorPerKind: Record<DialogKind, string> = {
    error: 'border-rose-400',
    warning: 'border-orange-400',
    info: 'border-blue-400',
    success: 'border-green-400'
  };

  protected hoverColorPerKind: Record<DialogKind, string> = {
    error: 'hover:bg-rose-600',
    warning: 'hover:bg-orange-600',
    info: 'hover:bg-blue-600',
    success: 'hover:bg-green-600'
  };

  protected iconPerKind: Record<DialogKind, string[]> = {
    error: ['fa-solid', 'fa-triangle-exclamation', 'fa-fade'],
    warning: ['fa-solid', 'fa-circle-exclamation', 'fa-fade'],
    info: ['fa-solid', 'fa-info'],
    success: ['fa-solid', 'fa-circle-check']
  };

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
