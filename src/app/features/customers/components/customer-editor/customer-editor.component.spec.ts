import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookupService } from '@poc/core/services/lookup.service';
import { of } from 'rxjs';

import { CustomerEditorComponent } from './customer-editor.component';

const fakeLookupService = {
  getLookup: () => of([])
};

describe('CustomerEditorComponent', () => {
  let component: CustomerEditorComponent;
  let fixture: ComponentFixture<CustomerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEditorComponent],
      providers: [
        {
          provide: LookupService,
          useValue: fakeLookupService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
