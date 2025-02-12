import { Injectable } from '@angular/core';
import { catchError, filter, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';

export type LookupItem = {
  key: string | number;
  value: string;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  #cache: Record<string, Observable<readonly LookupItem[]>> = {};
  #refresher = new Subject<string>();

  register(name: string, factory: () => Observable<readonly LookupItem[]>) {
    this.#cache[name] = this.#refresher.pipe(
      startWith(name),
      filter(v => v === name),
      switchMap(() => {
        return factory().pipe(
          catchError(err => {
            console.error(err);
            return of([]);
          })
        );
      }),
      shareReplay(1)
    );
  }

  getLookup = (name: string) => this.#cache[name];

  refresh = (name: string) => this.#refresher.next(name);
}
