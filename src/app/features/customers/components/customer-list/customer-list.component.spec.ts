import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListDefinition } from '@poc/shared/components/generic-list/generic-list.component';
import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', async () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [CustomerListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomerListComponent);
    const component = fixture.componentInstance;

    const empty: ListDefinition = {
      title: 'A Title',
      tableDefinition: {
        columns: []
      },
      toolbarActions: [],
      tableActions: [],
      defaultSort: { field: '', direction: 'asc' }
    };
    fixture.componentRef.setInput('listDefinition', empty);
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
