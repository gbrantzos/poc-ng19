import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sorting } from '@poc/core/base/search-criteria';
import { INITIAL_SEARCH_CRITERIA } from '@poc/core/base/store.data-table-state';
import { NotificationService } from '@poc/core/services/notification.service';
import { CUSTOMERS_LIST } from '@poc/definitions/customers.list.definition';
import { CustomerEditorComponent } from '@poc/features/customers/components/customer-editor/customer-editor.component';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import {
  GenericListComponent,
  ListData,
  ListDefinition
} from '@poc/shared/components/generic-list/generic-list.component';
import {
  ColumnDefinition,
  TableActionEvent,
  TableCellClickedEvent
} from '@poc/shared/components/generic-table/generic-table.component';
import { PagingEvent, PagingInfo } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';
import { TemplateNameDirective } from '@poc/shared/components/generic-table/template-name.directive';

@Component({
  selector: 'poc-customers',
  imports: [CustomerEditorComponent, MatSidenavModule, GenericListComponent, TemplateNameDirective],
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
        this.#store.load();
        break;
      }
      default:
        break;
    }
  }

  onEditorAction(type: string) {
    switch (type) {
      case 'cancel': {
        this.#store.clear();
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

  onTableDoubleClick(_event: TableCellClickedEvent) {
    // console.log(event.row);
    this.#store.load();
  }

  onTableCellClicked(_event: TableCellClickedEvent) {
    // console.log(event?.action, event?.row);
  }

  onTableRowAction(_event: TableActionEvent) {
    // console.log(event?.action, event?.row);
  }

  onTableSelectionAction(_event: TableActionEvent) {
    // console.log(event?.action, event?.selection);
  }
}
