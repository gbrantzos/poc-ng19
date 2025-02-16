import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DynamicListComponent, ListDefinition } from './dynamic-list.component';

describe('BasicListComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [DynamicListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DynamicListComponent);
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
