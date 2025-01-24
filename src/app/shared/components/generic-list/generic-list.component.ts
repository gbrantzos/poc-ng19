import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sorting } from '@poc/core/base/search-criteria';
import { GenericTableComponent, TableDefinition } from '@poc/shared/components/generic-table/generic-table.component';
import { PaginationComponent } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';
import { Action, ToolbarComponent } from '@poc/shared/components/toolbar/toolbar.component';

export type ListDefinition = {
  title: string;
  tableDefinition: TableDefinition;
  toolbarActions: Action[];
};

export type ListData = {
  rows: readonly unknown[];
  loading: boolean;
  sorting?: Sorting;
};

export const EMPTY_LIST: ListData = {
  rows: [],
  loading: false
};

@Component({
  selector: 'poc-generic-list',
  imports: [TitleComponent, ToolbarComponent, GenericTableComponent, PaginationComponent],
  templateUrl: './generic-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class GenericListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  tableSortChanged = output<Sorting>();
}
