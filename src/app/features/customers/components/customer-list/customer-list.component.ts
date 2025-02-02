import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sorting } from '@poc/core/base/search-criteria';
import { Customer } from '@poc/features/customers/domain/customer';
import {
  EMPTY_LIST,
  GenericListComponent,
  ListData,
  ListDefinition
} from '@poc/shared/components/generic-list/generic-list.component';
import { TableActionEvent, TableCellClickedEvent } from '@poc/shared/components/generic-table/generic-table.component';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';
import { EMPTY_PAGING, PagingEvent, PagingInfo } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customer-list',
  imports: [GenericListComponent, TemplateNameDirective],
  templateUrl: './customer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class CustomerListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);
  pagingInfo = input<PagingInfo>(EMPTY_PAGING);
  selectedCustomer = input<Customer | null>();

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();

  tableSortChanged = output<Sorting>();
  tableCellClicked = output<TableCellClickedEvent>();
  tableCellDoubleClicked = output<TableCellClickedEvent>();
  tableRowAction = output<TableActionEvent>();

  pagingChanged = output<PagingEvent>();
}
