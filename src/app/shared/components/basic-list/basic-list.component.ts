import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Sorting } from '@poc/core/base/search-criteria';
import { DynamicTableComponent, TableDefinition } from '@poc/shared/components/dynamic-table/dynamic-table.component';
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
  selector: 'poc-basic-list',
  imports: [DynamicTableComponent, TitleComponent, ToolbarComponent],
  templateUrl: './basic-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class BasicListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();
  tableSortChanged = output<Sort>();

  protected sortingToMatSort = (sorting?: Sorting): Sort | undefined => {
    if (sorting === undefined) {
      return undefined;
    }

    return {
      active: sorting.field,
      direction: sorting.direction
    } as Sort;
  };
}
