import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sorting } from '@poc/core/base/search-criteria';
import {
  EMPTY_LIST,
  GenericListComponent,
  ListData,
  ListDefinition
} from '@poc/shared/components/generic-list/generic-list.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customer-list',
  imports: [GenericListComponent],
  templateUrl: './customer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  tableSortChanged = output<Sorting>();
}
