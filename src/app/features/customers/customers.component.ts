import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Sorting } from '@poc/core/base/search-criteria';
import { CUSTOMERS_LIST } from '@poc/definitions/customers.list.definition';
import { CustomerListComponent } from '@poc/features/customers/components/customer-list/customer-list.component';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { ListData, ListDefinition } from '@poc/shared/components/generic-list/generic-list.component';
import { PagingEvent, PagingInfo } from '@poc/shared/components/pagination/pagination.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customers',
  imports: [CustomerListComponent],
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'py-2 px-3' }
})
export class CustomersComponent implements OnInit {
  #store = inject(CustomerStore);

  protected listData = computed<ListData>(() => ({
    rows: this.#store.listItems(),
    loading: this.#store.loading(),
    sorting: this.#store.sorting()
  }));
  protected pagingInfo = computed<PagingInfo>(() => {
    const pagingInfo: PagingInfo = {
      totalRows: this.#store.totalItems(),
      current: this.#store.paging().number,
      pageSize: this.#store.paging().size
    };
    return pagingInfo;
  });
  protected listDefinition: ListDefinition = CUSTOMERS_LIST;

  protected _uiRefresh = effect(() => {
    const error = this.#store.error();
    if (error) {
      alert(error);
    }
  });

  ngOnInit(): void {
    this.#store.find({ sorting: { field: 'fullName', direction: 'asc' } });
  }

  async onAction(actionName: string) {
    switch (actionName) {
      case 'refresh': {
        await this.#store.find();
        break;
      }
      default:
        break;
    }
  }

  async onSearch(event: SearchEvent) {
    if (typeof event === 'string') {
      await this.#store.find({ quickSearch: { term: '', fields: [] } });
      return;
    }
    if (Array.isArray(event)) {
      // event.map(f => f.field)
      return;
    }
    await this.#store.find({ quickSearch: { term: event.term, fields: event.fields } });
  }

  onSortChanged = async (sort: Sorting) =>
    await this.#store.find({ sorting: { field: sort.field, direction: sort.direction } });

  onPagingChanged = async (event: PagingEvent) =>
    await this.#store.find({ paging: { number: event.pageNumber, size: event.pageSize } });
}
