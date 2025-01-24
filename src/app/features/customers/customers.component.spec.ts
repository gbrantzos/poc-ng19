import { TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';
import { TopNavbarComponent } from '@poc/core/components/top-navbar/top-navbar.component';
import { provideRouter } from '@angular/router';

describe('CustomersComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [CustomersComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(TopNavbarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
