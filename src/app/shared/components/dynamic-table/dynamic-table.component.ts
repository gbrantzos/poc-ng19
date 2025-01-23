import { DatePipe, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
  // template ref
};

@Component({
  selector: 'poc-dynamic-table',
  imports: [MatTableModule, NgSwitch, NgSwitchCase, DecimalPipe, DatePipe, NgSwitchDefault, MatSortHeader, MatSort],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent {
  rows = input<readonly unknown[]>([]);
  loading = input<boolean>(false);
  sorting = input<Sort>();

  tableDefinition = input.required<TableDefinition>();
  tableData = computed(() => ({
    rows: this.rows(),
    loading: this.loading(),
    sorting: this.sorting()
  }));

  cellClicked = output<{ row: unknown; columnDef: ColumnDefinition }>();
  sortChanged = output<Sort>();

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
}
