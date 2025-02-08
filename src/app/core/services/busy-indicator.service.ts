import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyIndicatorService {
  // Ideas from
  // https://ckjaersig.dk/2020/05/showing-a-loading-spinner-delayed-with-rxjs/

  private readonly delayTimeMs: number = 2000;
  private loading$ = new Subject<number>();
  private shownCounter = 0;
  private cancelPending$ = new Subject<void>();

  public indicatorState: Observable<boolean>;
  public cancelPending = this.cancelPending$.asObservable();

  constructor() {
    this.indicatorState = this.loading$.pipe(
      switchMap(loadingDelay => {
        if (loadingDelay > 0) {
          return of(true).pipe(delay(loadingDelay));
        }
        return of(false);
      })
    );
  }

  public show(delay = this.delayTimeMs) {
    this.shownCounter++;
    this.loading$.next(delay);
  }

  public hide() {
    this.shownCounter--;
    if (this.shownCounter < 0) {
      this.shownCounter = 0;
    }
    if (this.shownCounter == 0) {
      this.loading$.next(0);
    }
  }

  public cancel() {
    this.cancelPending$.next();
    this.hide();
  }
}
