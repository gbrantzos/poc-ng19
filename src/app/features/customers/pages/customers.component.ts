import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { CustomerListComponent } from '@poc/features/customers/components/customer-list/customer-list.component';
import { TableDefinition } from '@poc/shared/components/dynamic-table/dynamic-table.component';
import { Action } from '@poc/shared/components/toolbar/toolbar.component';

@Component({
  selector: 'poc-customers',
  imports: [CustomerListComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'p-3' }
})
export class CustomersComponent implements OnInit {
  #store = inject(CustomerStore);

  items = this.#store.listItems;
  loading = this.#store.loading;
  _ = effect(() => {
    const error = this.#store.error();
    if (error) {
      alert(error);
    }
  });

  protected tableDefinition: TableDefinition = {
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
        type: 'string'
      },
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'string',
        isLink: false
      },
      {
        name: 'tin',
        label: 'TAX Number',
        type: 'string'
      },
      {
        name: 'dueAt',
        label: 'Due At',
        type: 'date',
        format: 'dd/MM/yyyy'
      },
      {
        name: 'balance',
        type: 'number',
        label: 'Balance',
        format: '0.2-2'
      },
      {
        name: 'overdue',
        type: 'boolean',
        label: 'Overdue'
      }
    ]
  };

  protected toolbarActions: Action[] = [
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
  ];

  ngOnInit(): void {
    this.#store.find();
  }

  onAction(actionName: string) {
    switch (actionName) {
      case 'refresh': {
        this.#store.find();
        break;
      }
      default:
        break;
    }
  }
}
