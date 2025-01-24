import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GenericListComponent, ListDefinition } from './generic-list.component';

describe('BasicListComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [GenericListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(GenericListComponent);
    const component = fixture.componentInstance;

    const empty: ListDefinition = {
      title: 'A Title',
      tableDefinition: {
        columns: []
      },
      toolbarActions: []
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
