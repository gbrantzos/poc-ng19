import { inject, provideEnvironmentInitializer } from '@angular/core';
import { LookupItem, LookupService } from '@poc/core/services/lookup.service';
import { of } from 'rxjs';

export const provideHomeServices = () => {
  return provideEnvironmentInitializer(() => {
    const initFn = (lookupService: LookupService) => {
      lookupService.register('Home', () =>
        of<LookupItem[]>([
          { key: 1, value: 'Value 1' },
          { key: 2, value: 'Value 2' },
          { key: 3, value: 'Value 3' }
        ])
      );
    };
    return initFn(inject(LookupService));
  });
};
