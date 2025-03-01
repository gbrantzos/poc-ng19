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
      kind: 'text',
      validators: [{ name: 'required' }]
    },
    {
      name: 'fullName',
      label: 'Full Name',
      kind: 'text',
      validators: [{ name: 'required' }]
    },
    {
      name: 'tin',
      label: 'TAX Number',
      kind: 'text',
      class: 'basis-2/5',
      validators: [
        { name: 'required' },
        {
          name: 'minLength',
          args: 3
        }
      ]
    },
    {
      name: 'dueAt',
      label: 'Due At',
      kind: 'date',
      validators: [{ name: 'required' }],
      class: 'basis-3/5'
    },
    {
      name: 'overdue',
      kind: 'checkbox',
      label: 'Overdue',
      validators: [{ name: 'requiredTrue' }]
    },
    {
      name: 'category',
      kind: 'select',
      label: 'Category',
      validators: [{ name: 'required' }],
      lookupName: Lookups.Categories
    },
    {
      name: 'comments',
      label: 'Comments',
      kind: 'textarea'
    }
  ]
};
