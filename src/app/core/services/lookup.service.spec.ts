import { LookupItem, LookupService } from '@poc/core/services/lookup.service';
import { of } from 'rxjs';

describe('Lookup service', () => {
  function setup() {
    const service = new LookupService();

    const lookupProvider = {
      factory: () => {
        const items: readonly LookupItem[] = [
          { key: 1, value: '1' },
          { key: 2, value: '2' },
          { key: 3, value: '3' }
        ];
        return items;
      }
    };
    return { service, lookupProvider };
  }

  it('should return lookup items', (done: DoneFn) => {
    const { service, lookupProvider } = setup();
    service.register('test', () => of(lookupProvider.factory()));

    const lookup = service.getLookup('test');
    lookup.subscribe(v => {
      expect(v.length).toBe(3);
      done();
    });
  });

  it('should only call factory once', () => {
    const { service, lookupProvider } = setup();
    const factorySpy = spyOn(lookupProvider, 'factory').and.callThrough();

    service.register('test', () => of(lookupProvider.factory()));

    const lookup = service.getLookup('test');
    lookup.subscribe();
    lookup.subscribe();

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  it('should call factory after reset', (done: DoneFn) => {
    const { service, lookupProvider } = setup();
    const factorySpy = spyOn(lookupProvider, 'factory').and.callThrough();

    service.register('test', () => of(lookupProvider.factory()));

    const lookup = service.getLookup('test');
    lookup.subscribe();
    lookup.subscribe();
    lookup.subscribe();
    factorySpy.calls.reset();

    service.refresh('test');
    lookup.subscribe();
    lookup.subscribe(() => done());

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });
});
