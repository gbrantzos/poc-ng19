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
  ElementRef,
  input,
  output,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Sorting } from '@poc/core/base/search-criteria';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';
import { Action } from '@poc/shared/components/toolbar/toolbar.component';
import { debounceTime, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

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
  sticky?: 'start' | 'end';
  width?: number;
  style?: string;
  class?: string | string[];
  headerStyle?: string;
  headerClass?: string | string[];
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

const RESIZE_DEBOUNCE = 200;
const DEFAULT_WIDTH = 200;
const SELECT_WIDTH = 42;
const ACTIONS_WIDTH = 60;
const WIDTH_OFFSET = 20;
const ACTIONS_COLUMN = '__actions';
const SELECT_COLUMN = '__select';
const EMPTY_COLUMN = '__empty';

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
  table = viewChild(MatTable, { read: ElementRef });

  selection = new SelectionModel<unknown>(true, []);

  cellClicked = output<TableCellClickedEvent>();
  cellDoubleClicked = output<TableCellClickedEvent>();
  rowAction = output<TableActionEvent>();
  sortChanged = output<Sorting>();
  selectionChanged = outputFromObservable(this.selection.changed);

  private resized$ = fromEvent(window, 'resize').pipe(
    debounceTime(RESIZE_DEBOUNCE),
    distinctUntilChanged(),
    startWith(window.innerWidth),
    map(() => window.innerWidth)
  );
  protected resized = toSignal(this.resized$);

  protected columnsWidth = computed(() => {
    const columns = this.tableDefinition().columns;
    const _ = this.resized();

    const toDisplay = columns.filter(c => !c.hidden).map(c => c.name);
    const tableWidth = this.elRef.nativeElement.clientWidth;
    let columnsWidth = columns.reduce((acc, col) => acc + (col.width || DEFAULT_WIDTH), 0);
    if (this.tableDefinition().rowActions) {
      toDisplay.push(ACTIONS_COLUMN);
      columnsWidth += ACTIONS_WIDTH;
    }
    if (this.tableDefinition().enableSelection) {
      toDisplay.unshift(SELECT_COLUMN);
      columnsWidth += SELECT_WIDTH;
    }
    if (columnsWidth < tableWidth) {
      const position = this.tableDefinition().rowActions ? toDisplay.length - 1 : toDisplay.length;
      toDisplay.splice(position, 0, EMPTY_COLUMN);
    }
    columnsWidth += toDisplay.length + 1;
    // console.table({ columnsWidth, tableWidth });

    const finalWidth = Math.max(columnsWidth, tableWidth) - WIDTH_OFFSET;
    return {
      displayedColumns: toDisplay,
      columnsWidth: `${finalWidth}px`
    };
  });

  protected selectionSummary = signal<string>('');

  protected currentRowNum = 0;

  constructor(private elRef: ElementRef) {
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
