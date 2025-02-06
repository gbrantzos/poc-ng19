import { SelectionModel } from '@angular/cdk/collections';
import {
  DatePipe,
  DecimalPipe,
  NgClass,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  TemplateRef
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Sorting } from '@poc/core/base/search-criteria';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';
import { Action } from '@poc/shared/components/toolbar/toolbar.component';

export type TableDefinition = {
  columns: ColumnDefinition[];
  rowActions?: Action[];
  enableSelection?: boolean;
};

export type ColumnDefinition = {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  format?: string;
  hidden?: boolean;
  style?: string;
  class?: string | string[];
  isLink?: boolean;
  isSortable?: boolean;
};

export type TableCellClickedEvent = {
  row: unknown;
  columnDef: ColumnDefinition;
};

export type TableActionEvent = {
  action: string;
  row?: unknown | unknown[];
  selection?: unknown[];
};

const ACTIONS_COLUMN = '__actions';
const SELECT_COLUMN = '__select';

@Component({
  selector: 'poc-generic-table',
  imports: [
    MatTableModule,
    NgSwitch,
    NgSwitchCase,
    DecimalPipe,
    DatePipe,
    NgSwitchDefault,
    MatSortHeader,
    MatSort,
    NgClass,
    NgTemplateOutlet,
    MatMenuModule,
    MatCheckbox
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-auto' }
})
export class GenericTableComponent {
  rows = input<readonly unknown[]>([]);
  loading = input<boolean>(false);
  sorting = input<Sorting>();

  tableDefinition = input.required<TableDefinition>();
  tableData = computed(() => ({
    rows: this.rows(),
    loading: this.loading(),
    sorting: this.sorting()
  }));
  templates = input<readonly TemplateNameDirective[]>([]);

  selection = new SelectionModel<unknown>(true, []);

  cellClicked = output<TableCellClickedEvent>();
  cellDoubleClicked = output<TableCellClickedEvent>();
  rowAction = output<TableActionEvent>();
  sortChanged = output<Sorting>();
  selectionChanged = outputFromObservable(this.selection.changed);

  protected selectionSummary = signal<string>('');

  protected displayedColumns = computed(() => {
    const columns = this.tableDefinition().columns;
    const toDisplay = columns.filter(c => !c.hidden).map(c => c.name);

    if (this.tableDefinition().rowActions) {
      toDisplay.push(ACTIONS_COLUMN);
    }
    if (this.tableDefinition().enableSelection) {
      toDisplay.unshift(SELECT_COLUMN);
    }
    return toDisplay;
  });

  protected currentRowNum = 0;

  constructor() {
    effect(() => {
      const _ = this.rows();
      this.currentRowNum = 0;
      this.selection.clear();
    });
    this.selection.changed.subscribe(_ => this.selectionSummary.set(`${this.selection.selected.length} rows selected`));
  }

  protected onSortChanged(sort: Sort) {
    const sorting = GenericTableComponent.matSortToSorting(sort);
    if (sorting) {
      this.sortChanged.emit(sorting);
    }
  }

  protected getColumnTemplate(name?: string): TemplateRef<unknown> | undefined {
    const templates = this.templates();
    return templates.find(t => t.name() === name)?.template;
  }

  protected static matSortToSorting = (sort: Sort): Sorting | undefined => {
    if (sort.direction === '') {
      return undefined;
    }
    return {
      field: sort.active,
      direction: sort.direction
    };
  };

  protected isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rows().length;
    return numSelected === numRows;
  }

  protected toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.rows());
  }

  public clearSelection = () => this.selection.clear();
}
