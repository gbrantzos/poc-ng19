import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DynamicTableComponent, TableDefinition } from './dynamic-table.component';

describe('GenericTableComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [DynamicTableComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DynamicTableComponent);
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
