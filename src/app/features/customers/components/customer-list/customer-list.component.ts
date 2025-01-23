import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  BasicListComponent,
  EMPTY_LIST,
  ListData,
  ListDefinition
} from '@poc/shared/components/basic-list/basic-list.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customer-list',
  imports: [BasicListComponent],
  templateUrl: './customer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  tableSortChanged = output<Sort>();
}
