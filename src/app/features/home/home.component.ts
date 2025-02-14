import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LookupService } from '@poc/core/services/lookup.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

export type DialogData = {
  animal: string;
  name: string;
};

@Component({
  selector: 'poc-home',
  templateUrl: './home.component.html',
  imports: [MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  title = 'Home - POC Project';
  lookupItems = toSignal(inject(LookupService).getLookup('Home'));

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  onDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleComponent, {
      data: { name: this.name(), animal: this.animal() },
      width: '60%',
      height: '50%',
      panelClass: 'my-panel-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  selector: 'poc-dialog-overview-example-dialog',
  template: `
    <h2 mat-dialog-title>Hi {{ data.name }}</h2>
    <mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <mat-label>Favorite Animal</mat-label>
        <input matInput [(ngModel)]="animal" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions class="bg-gray-200">
      <button class="core" mat-button (click)="onNoClick()">No Thanks</button>
      <button class="core primary" mat-flat-button [mat-dialog-close]="animal()" cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `
})
export class DialogOverviewExampleComponent {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
