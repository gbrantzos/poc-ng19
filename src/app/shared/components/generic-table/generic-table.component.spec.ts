import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GenericTableComponent, TableDefinition } from './generic-table.component';

describe('DynamicTableComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [GenericTableComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(GenericTableComponent);
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
