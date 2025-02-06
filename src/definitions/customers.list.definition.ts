import { ListDefinition } from '@poc/shared/components/generic-list/generic-list.component';

export const CUSTOMERS_LIST: ListDefinition = {
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
        isSortable: true,
        sticky: 'start'
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
    ],
    rowActions: [
      {
        name: 'row.edit',
        label: 'Edit',
        icon: ['fa-solid', 'fa-pencil']
      },
      {
        name: 'row.delete',
        label: 'Delete',
        icon: ['fa-regular', 'fa-trash-can']
      }
    ],
    enableSelection: true
  },
  toolbarActions: [
    {
      name: 'toolbar.new',
      label: 'New Customer',
      isPrimary: true,
      icon: ['fa-solid', 'fa-plus']
    },
    {
      name: 'toolbar.refresh',
      icon: ['fa-solid', 'fa-rotate'],
      tooltip: 'Refresh List'
    }
  ],
  tableActions: [
    {
      name: 'table.import',
      label: 'Import to ERP',
      icon: ['fa-solid', 'fa-share-from-square']
    },
    {
      name: 'table.download',
      label: 'Download',
      icon: ['fa-solid', 'fa-cloud-arrow-down']
    }
  ],
  defaultSort: { field: 'fullName', direction: 'asc' }
};
