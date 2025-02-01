import {
  DatePipe,
  DecimalPipe,
  NgClass,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet
} from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, TemplateRef } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Sorting } from '@poc/core/base/search-criteria';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';
import { Action } from '@poc/shared/components/toolbar/toolbar.component';

export type TableDefinition = {
  columns: ColumnDefinition[];
  rowActions?: Action[];
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
  row: unknown;
  action: string;
};

const ACTIONS_COLUMN = 'actions';

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
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col' }
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

  cellClicked = output<TableCellClickedEvent>();
  cellDoubleClicked = output<TableCellClickedEvent>();
  sortChanged = output<Sorting>();
  rowAction = output<TableActionEvent>();

  protected displayedColumns = computed(() => {
    const columns = this.tableDefinition().columns;
    const toDisplay = columns.filter(c => !c.hidden).map(c => c.name);

    if (this.tableDefinition().rowActions) {
      toDisplay.push(ACTIONS_COLUMN);
    }
    return toDisplay;
  });

  protected _ = effect(() => {
    const _ = this.rows();
    this.currentRowNum = 0;
  });
  protected currentRowNum = 0;

  onSortChanged(sort: Sort) {
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
}
