import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookupService } from '@poc/core/services/lookup.service';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

const fakeLookupService = {
  getLookup: () => of([])
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: LookupService,
          useValue: fakeLookupService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
