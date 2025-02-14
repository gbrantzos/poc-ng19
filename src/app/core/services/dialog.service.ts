import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@poc/core/components/dialog/dialog.component';
import { firstValueFrom, map } from 'rxjs';

export type DialogKind = 'info' | 'warning' | 'error' | 'success';
export type DialogData = {
  kind: DialogKind;
  title: string;
  message: string;
  showCancel?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly #matDialog = inject(MatDialog);

  public dialog(title: string, message: string, kind: DialogKind = 'info', showCancel = false): Promise<boolean> {
    this.removeActiveFocus();
    const dialogRef = this.#matDialog.open(DialogComponent, {
      data: {
        kind,
        title,
        message,
        showCancel
      } as DialogData,
      width: '460px',
      height: '240px',
      panelClass: 'borderless'
    });

    const dialogCall = dialogRef.afterClosed().pipe(map(res => res === true));
    return firstValueFrom(dialogCall);
  }

  // More details on
  // https://stackoverflow.com/a/79244497/3410871
  private removeActiveFocus() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
