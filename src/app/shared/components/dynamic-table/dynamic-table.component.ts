import { DatePipe, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, viewChild } from '@angular/core';
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
  sort = viewChild(MatSort);

  tableDefinition = input.required<TableDefinition>();
  data = input<readonly unknown[]>([]);
  loading = input<boolean>(false);
  cellClicked = output<{ row: unknown; columnDef: ColumnDefinition }>();
  sortChanged = output<Sort>();

  protected displayedColumns = computed(() => {
    const columns = this.tableDefinition().columns;

    return columns.filter(c => !c.hidden).map(c => c.name);
  });
  protected _ = effect(() => {
    const _ = this.data();
    // const sort = this.sort();
    // const definition = this.tableDefinition();

    this.currentRowNum = 0;

    // TODO Come up with a better solution on initial sorting
    // const firstVisible = definition.columns.filter(f => !f.hidden)[0];
    //sort?.sort({ id: firstVisible.name, start: 'asc', disableClear: false });
  });
  protected currentRowNum = 0;

  onClick = (row: unknown, columnDef: ColumnDefinition) => this.cellClicked.emit({ row, columnDef });
}
