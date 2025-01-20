import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

export interface TableDefinition {
  columns: ColumnDefinition[];
}

export interface ColumnDefinition {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  format?: string;
  hidden?: boolean;
  style?: string;
  class?: string | string[];
  isLink?: boolean;
  // template ref
  // is sortable
  // actions for row
}

@Component({
  selector: 'poc-dynamic-table',
  imports: [MatTableModule, NgSwitch, NgSwitchCase, DecimalPipe, DatePipe, NgSwitchDefault],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent {
  tableDefinition = input.required<TableDefinition>();
  data = input<readonly unknown[]>([]);
  loading = input<boolean>(false);
  cellClicked = output<{ row: unknown; columnDef: ColumnDefinition }>();

  protected displayedColumns = computed(() => {
    const columns = this.tableDefinition().columns;

    return columns.filter(c => !c.hidden).map(c => c.name);
  });
  protected currentRowNum = 0;

  onClick = (row: unknown, columnDef: ColumnDefinition) => this.cellClicked.emit({ row, columnDef });
}
