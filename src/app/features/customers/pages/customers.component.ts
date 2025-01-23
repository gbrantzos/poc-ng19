import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { CustomerListComponent } from '@poc/features/customers/components/customer-list/customer-list.component';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { ListData, ListDefinition } from '@poc/shared/components/basic-list/basic-list.component';
import { SearchEvent } from '@poc/shared/components/search-box/search-box.component';

@Component({
  selector: 'poc-customers',
  imports: [CustomerListComponent],
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'p-3' }
})
export class CustomersComponent implements OnInit {
  #store = inject(CustomerStore);

  protected listData = computed<ListData>(() => ({
    rows: this.#store.listItems(),
    loading: this.#store.loading(),
    sorting: this.#store.sorting()
  }));
  protected listDefinition: ListDefinition = {
    title: 'Customers List',
    tableDefinition: {
      columns: [
        {
          name: 'id',
          label: 'Customer ID',
          type: 'string',
          hidden: true
        },
        {
          name: 'code',
          label: 'Code',
          type: 'string',
          isSortable: true
        },
        {
          name: 'fullName',
          label: 'Full Name',
          type: 'string',
          isLink: false,
          isSortable: true
        },
        {
          name: 'tin',
          label: 'TAX Number',
          type: 'string',
          isSortable: true
        },
        {
          name: 'dueAt',
          label: 'Due At',
          type: 'date',
          format: 'dd/MM/yyyy',
          style: 'width:120px'
        },
        {
          name: 'balance',
          type: 'number',
          label: 'Balance',
          format: '0.2-2',
          style: 'width:120px'
        },
        {
          name: 'overdue',
          type: 'boolean',
          label: 'Overdue',
          style: 'width:120px'
        }
      ]
    },
    toolbarActions: [
      {
        name: 'new',
        label: 'New Customer',
        isPrimary: true,
        icon: ['ph', 'ph-plus']
      },
      {
        name: 'import',
        label: 'Import to ERP'
      },
      {
        name: 'download',
        label: 'Download'
      },
      {
        name: 'refresh',
        icon: ['ph', 'ph-arrows-clockwise'],
        tooltip: 'Refresh List'
      }
    ]
  };

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

  async onSortChanged(sort: Sort) {
    if (sort.direction === '') {
      return;
    }
    await this.#store.find({ sorting: { field: sort.active, direction: sort.direction } });
  }
}
