import { computed } from '@angular/core';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';

export type RequestState = 'INIT' | 'LOADING' | 'LOADED' | { message: string };

export function withRequestState() {
  return signalStoreFeature(
    withState<{ requestState: RequestState }>({ requestState: 'INIT' }),
    withComputed(({ requestState }) => ({
      loading: computed(() => requestState() === 'LOADING'),
      loaded: computed(() => requestState() === 'LOADED'),
      error: computed(() => {
        const state = requestState();
        return state !== null && typeof state === 'object' ? state.message : null;
      })
    })),
    withMethods(store => ({
      setLoading: () => patchState(store, { requestState: 'LOADING' }),
      setLoaded: () => patchState(store, { requestState: 'LOADED' }),
      setError: (errorMessage: string) => patchState(store, { requestState: { message: errorMessage } })
    }))
  );
}
