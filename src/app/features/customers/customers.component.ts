import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListItem } from '@poc/core/base/api.list-client';
import { Sorting } from '@poc/core/base/search-criteria';
import { INITIAL_SEARCH_CRITERIA } from '@poc/core/base/store.data-table-state';
import { NotificationService } from '@poc/core/services/notification.service';
import { CUSTOMERS_LIST } from '@poc/definitions/customers.list.definition';
import { CustomerEditorComponent } from '@poc/features/customers/components/customer-editor/customer-editor.component';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import {
  DynamicListComponent,
  ListData,
  ListDefinition
} from '@poc/shared/components/dynamic-list/dynamic-list.component';
import {
  ColumnDefinition,
  TableCellActionEvent,
  TableRowActionEvent
} from '@poc/shared/components/dynamic-table/dynamic-table.component';
import { TemplateNameDirective } from '@poc/shared/components/dynamic-table/template-name.directive';
import { PagingEvent, PagingInfo } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customers',
  imports: [CustomerEditorComponent, MatSidenavModule, DynamicListComponent, TemplateNameDirective],
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  #store = inject(CustomerStore);

  protected listData = computed<ListData>(() => ({
    rows: this.#store.listItems(),
    loading: this.#store.loading(),
    sorting: this.#store.searchCriteria.sorting()
  }));

  protected pagingInfo = computed<PagingInfo>(() => {
    const pagingInfo: PagingInfo = {
      totalRows: this.#store.totalItems(),
      current: this.#store.searchCriteria.paging().number,
      pageSize: this.#store.searchCriteria.paging().size
    };
    return pagingInfo;
  });

  protected manyColumns = Array.from({ length: 20 }, (_, index) => index).map(
    i =>
      ({
        name: `row${i + 1}`,
        label: `Row ${i + 1}`,
        style: 'width: 240px'
      }) as ColumnDefinition
  );
  protected listDefinition: ListDefinition = CUSTOMERS_LIST;
  // protected listDefinition: ListDefinition = {
  //   ...this.listDefinition1,
  //   tableDefinition: {
  //     ...this.listDefinition1.tableDefinition,
  //     columns: [...this.listDefinition1.tableDefinition.columns, ...this.manyColumns]
  //   }
  // };
  protected selectedCustomer = this.#store.selected;
  protected drawerOpen = computed(() => this.selectedCustomer() !== null);

  #notificationService = inject(NotificationService);

  constructor() {
    effect(() => {
      const error = this.#store.error();
      if (error) {
        this.#notificationService.error('Error retrieving customers', error);
      }
    });
  }

  ngOnInit(): void {
    this.#store.find({ sorting: this.listDefinition.defaultSort }).then();
  }

  async onToolbarAction(actionName: string) {
    switch (actionName) {
      case 'toolbar.refresh': {
        await this.#store.find();
        break;
      }
      case 'toolbar.new': {
        this.#store.new();
        break;
      }
      default:
        break;
    }
  }

  onEditorAction(type: string) {
    switch (type) {
      case 'cancel': {
        this.#store.clearSelected();
        break;
      }
    }
  }

  async onSearch(event: SearchEvent) {
    if (typeof event === 'string' && event === 'CLEARED') {
      await this.#store.find({ ...INITIAL_SEARCH_CRITERIA, sorting: this.listDefinition.defaultSort });
      return;
    }
    if (Array.isArray(event)) {
      // event.map(f => f.field)
      return;
    }
    await this.#store.find({ quickSearch: { term: event.term } });
  }

  onSortChanged = async (sort: Sorting) =>
    await this.#store.find({ sorting: { field: sort.field, direction: sort.direction } });

  onPagingChanged = async (event: PagingEvent) =>
    await this.#store.find({ paging: { number: event.pageNumber, size: event.pageSize } });

  onTableCellAction(event: TableCellActionEvent) {
    if (event.kind == 'dblClick') {
      const id = (event.row as ListItem).id as string;
      if (!id) {
        this.#notificationService.error(this.listDefinition.title, 'Could not get customer ID from list row');
      }
      this.#store.load(id);
    }
  }

  onTableRowAction(event: TableRowActionEvent) {
    switch (event.action) {
      case 'row.edit': {
        const id = (event.row as ListItem).id as string;
        if (!id) {
          this.#notificationService.error(this.listDefinition.title, 'Could not get customer ID from list row');
        }
        this.#store.load(id);
        break;
      }
    }
  }

  onTableSelectionAction(_event: TableRowActionEvent) {
    // console.log(event?.action, event?.selection);
  }
}
