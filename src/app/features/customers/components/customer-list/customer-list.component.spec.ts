import { CustomerListComponent } from './customer-list.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TableDefinition } from '@poc/shared/components/dynamic-table/dynamic-table.component';

describe('CustomerListComponent', async () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [CustomerListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomerListComponent);
    const component = fixture.componentInstance;

    const empty: TableDefinition = {
      columns: []
    };
    fixture.componentRef.setInput('tableDefinition', empty);
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
