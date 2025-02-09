import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '@poc/core/components/notification/notification.component';

const DEFAULT_SNACKBAR_DURATION = 5000;

export type NotificationKind = 'info' | 'warning' | 'error' | 'success';
export type NotificationData = {
  kind: NotificationKind;
  title: string;
  message: string;
  duration?: number;
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  #snackbar = inject(MatSnackBar);

  info(title: string, message: string, duration = DEFAULT_SNACKBAR_DURATION) {
    return this.showNotification({
      kind: 'info',
      title,
      message,
      duration
    });
  }

  warning(title: string, message: string, duration = DEFAULT_SNACKBAR_DURATION) {
    return this.showNotification({
      kind: 'warning',
      title,
      message,
      duration
    });
  }

  error(title: string, message: string, duration = DEFAULT_SNACKBAR_DURATION) {
    return this.showNotification({
      kind: 'error',
      title,
      message,
      duration
    });
  }

  success(title: string, message: string, duration = DEFAULT_SNACKBAR_DURATION) {
    return this.showNotification({
      kind: 'success',
      title,
      message,
      duration
    });
  }

  private showNotification(data: NotificationData) {
    return this.#snackbar.openFromComponent(NotificationComponent, {
      panelClass: 'panel',
      data: {
        kind: data.kind,
        title: data.title,
        message: data.message
      },
      duration: data.duration,
      horizontalPosition: 'end'
    });
  }
}
