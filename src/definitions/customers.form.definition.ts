import { Lookups } from '@poc/features/customers/customers.providers';
import { FormDefinition } from '@poc/shared/components/dynamic-form/dynamic-form.component';

export const CUSTOMER_FORM: FormDefinition = {
  name: 'customers_form',
  label: 'Customers Editor',
  fields: [
    {
      name: 'id',
      label: 'Customer ID',
      kind: 'text',
      hidden: true
    },
    {
      name: 'code',
      label: 'Code',
      kind: 'text'
    },
    {
      name: 'fullName',
      label: 'Full Name',
      kind: 'text'
    },
    {
      name: 'tin',
      label: 'TAX Number',
      kind: 'text',
      class: 'basis-2/5'
    },
    {
      name: 'dueAt',
      label: 'Due At',
      kind: 'date',
      class: 'basis-3/5'
    },
    {
      name: 'overdue',
      kind: 'checkbox',
      label: 'Overdue'
    },
    {
      name: 'category',
      kind: 'select',
      label: 'Category',
      lookupName: Lookups.Categories
    },
    {
      name: 'comments',
      label: 'Comments',
      kind: 'textarea'
    }
  ]
};
