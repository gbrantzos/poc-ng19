import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Customer } from '@poc/features/customers/domain/customer';
import { DynamicTableComponent, TableDefinition } from '@poc/shared/components/dynamic-table/dynamic-table.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';
import { Action, ToolbarComponent } from '@poc/shared/components/toolbar/toolbar.component';

@Component({
  selector: 'poc-customer-list',
  imports: [ToolbarComponent, TitleComponent, DynamicTableComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  tableDefinition = input.required<TableDefinition>();
  toolbarActions = input<Action[]>();
  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  tableSortChanged = output<Sort>();

  loading = input<boolean>(false);
  items = input<readonly Customer[]>([]);
  protected readonly console = console;
}
