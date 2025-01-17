import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Action, ToolbarComponent } from '@poc/shared/components/toolbar/toolbar.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';
import { Customer } from '@poc/features/customers/domain/customer';
import { DynamicTableComponent, TableDefinition } from '@poc/shared/components/dynamic-table/dynamic-table.component';

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
  toolbarClicked = output<string>();

  loading = input<boolean>(false);
  items = input<readonly Customer[]>([]);
  protected readonly console = console;
}
