import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { Customer } from '@poc/features/customers/domain/customer';
import { withRequestState } from '@poc/core/base/request-state';
import { inject } from '@angular/core';
import { CustomerDTO, CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { ApiResponseResult } from '@poc/core/base/api-repsonse';

export interface CustomerState {
  listItems: readonly Customer[];
}

const initialState = (): CustomerState => {
  return { listItems: [] };
};

export const CustomerStore = signalStore(
  withProps(() => ({
    apiClient: inject(CustomersApiClient)
  })),
  withState<CustomerState>(initialState()),
  withRequestState(),
  withMethods(store => ({
    async find(): Promise<void> {
      try {
        store.setLoading();
        patchState(store, { listItems: [] });
        const response = await store.apiClient.find();
        if (response.result == ApiResponseResult.SUCCESS) {
          patchState(store, { listItems: response.data.map(c => customerDtoToModel(c)) });
          store.setLoaded();
        }
        if (response.result == ApiResponseResult.ERROR) {
          store.setError(response.error);
        }
      } catch (e) {
        console.error('Error calling Customer API', e);
        store.setError((e as Error).message);
      }
    }
  }))
);

export const customerDtoToModel = (dto: CustomerDTO): Customer => ({
  id: dto.custID,
  code: dto.code,
  fullName: dto.fullName,
  tin: dto.tin
});
