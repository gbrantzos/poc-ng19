import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDataTableState } from '@poc/core/base/store.data-table-state';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { Customer, CustomerID } from '@poc/features/customers/domain/customer';

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
          code: '',
          fullName: '',
          tin: ''
        } as Customer
      });
    },
    load(id: CustomerID) {
      patchState(store, {
        selected: {
          id,
          code: '',
          fullName: '',
          tin: ''
        } as Customer
      });
    },
    clearSelected() {
      patchState(store, { selected: null });
    }
  }))
);
