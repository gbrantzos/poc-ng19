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
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Sorting } from '@poc/core/base/search-criteria';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';

export type TableDefinition = {
  columns: ColumnDefinition[];
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
    NgTemplateOutlet
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

  cellClicked = output<{ row: unknown; columnDef: ColumnDefinition }>();
  sortChanged = output<Sorting>();

  protected displayedColumns = computed(() => {
    const columns = this.tableDefinition().columns;
    return columns.filter(c => !c.hidden).map(c => c.name);
  });
  protected _ = effect(() => {
    const _ = this.rows();
    this.currentRowNum = 0;
  });
  protected currentRowNum = 0;

  onClick = (row: unknown, columnDef: ColumnDefinition) => this.cellClicked.emit({ row, columnDef });

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
