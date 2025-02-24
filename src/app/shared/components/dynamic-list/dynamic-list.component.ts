import { SelectionChange } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, contentChildren, input, output, signal } from '@angular/core';
import { Sorting } from '@poc/core/base/search-criteria';
import {
  DynamicTableComponent,
  TableCellActionEvent,
  TableDefinition,
  TableRowActionEvent
} from '@poc/shared/components/dynamic-table/dynamic-table.component';
import { TemplateNameDirective } from '@poc/shared/components/dynamic-table/template-name.directive';
import {
  EMPTY_PAGING,
  PaginationComponent,
  PagingEvent,
  PagingInfo
} from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';
import { TitleComponent } from '@poc/shared/components/title/title.component';
import { Action, ToolbarComponent } from '@poc/shared/components/toolbar/toolbar.component';

export type ListDefinition = {
  title: string;
  tableDefinition: TableDefinition;
  toolbarActions: Action[];
  tableActions: Action[];
  defaultSort: Sorting;
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
  selector: 'poc-dynamic-list',
  imports: [TitleComponent, ToolbarComponent, DynamicTableComponent, PaginationComponent],
  templateUrl: './dynamic-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class DynamicListComponent {
  listDefinition = input.required<ListDefinition>();
  listData = input<ListData>(EMPTY_LIST);
  pagingInfo = input<PagingInfo>(EMPTY_PAGING);
  templates = contentChildren(TemplateNameDirective);

  toolbarClick = output<string>();
  toolbarSearch = output<SearchEvent>();

  tableSortChanged = output<Sorting>();
  tableCellAction = output<TableCellActionEvent>();
  tableRowAction = output<TableRowActionEvent>();
  tableSelectionAction = output<TableRowActionEvent>();

  pagingChanged = output<PagingEvent>();

  tableSelection = signal<readonly unknown[]>([]);

  onSelectionChanged(event: SelectionChange<unknown>) {
    this.tableSelection.set(event.source.selected);
  }
}
