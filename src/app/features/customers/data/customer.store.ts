import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDataTableState } from '@poc/core/base/store.data-table-state';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { Customer, CustomerID } from '@poc/features/customers/domain/customer';
import { DateTime } from 'luxon';

export type CustomerState = {
  selected: Customer | null;
};

const initialState = (): CustomerState => ({ selected: null });

export const CustomerStore = signalStore(
  withState<CustomerState>(initialState()),
  withDataTableState(CustomersApiClient),
  withMethods(store => ({
    new() {
      patchState(store, {
        selected: {
          id: '',
          code: '<NEW CUSTOMER>',
          fullName: '',
          tin: '',
          dueAt: DateTime.local()
        } as Customer
      });
    },
    load(id: CustomerID) {
      const customer = store.listItems().find(c => c.id === id);
      if (!customer) {
        throw new Error(`Customer not found! ID: ${id}`);
      }
      patchState(store, {
        selected: {
          id,
          code: customer['code'],
          fullName: customer['fullName'],
          tin: customer['tin'],
          dueAt: customer['dueAt'],
          balance: customer['balance'],
          overdue: customer['overdue']
        } as Customer
      });
    },
    clearSelected() {
      patchState(store, { selected: null });
    }
  }))
);
