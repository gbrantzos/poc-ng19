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
