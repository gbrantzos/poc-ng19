import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sorting } from '@poc/core/base/search-criteria';
import { INITIAL_SEARCH_CRITERIA } from '@poc/core/base/store.data-table-state';
import { CUSTOMERS_LIST } from '@poc/definitions/customers.list.definition';
import { CustomerEditorComponent } from '@poc/features/customers/components/customer-editor/customer-editor.component';
import { CustomerListComponent } from '@poc/features/customers/components/customer-list/customer-list.component';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { ListData, ListDefinition } from '@poc/shared/components/generic-list/generic-list.component';
import { PagingEvent, PagingInfo } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customers',
  imports: [CustomerListComponent, CustomerEditorComponent, MatSidenavModule],
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

  protected listDefinition: ListDefinition = CUSTOMERS_LIST;
  protected selectedCustomer = this.#store.selected;
  protected drawerOpen = computed(() => this.selectedCustomer() !== null);

  constructor() {
    effect(() => {
      const error = this.#store.error();
      if (error) {
        alert(error);
      }
    });
  }

  ngOnInit(): void {
    this.#store.find({ sorting: this.listDefinition.defaultSort }).then();
  }

  async onToolbarAction(actionName: string) {
    switch (actionName) {
      case 'refresh': {
        await this.#store.find();
        break;
      }
      case 'new': {
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
}
