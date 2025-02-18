import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            kind: 'info',
            title: 'a Title',
            message: 'A message'
          }
        }
      ],
      imports: [DialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
