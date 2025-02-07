import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyIndicatorService {
  // Ideas from
  // https://ckjaersig.dk/2020/05/showing-a-loading-spinner-delayed-with-rxjs/

  private readonly delayTimeMs: number = 450;
  private loading$ = new Subject();
  private shownCounter = 0;

  public indicatorState: Observable<boolean>;

  constructor() {
    this.indicatorState = this.loading$.pipe(
      switchMap(loading => {
        if (loading) {
          return of(true).pipe(delay(this.delayTimeMs));
        }
        return of(false);
      })
    );
  }

  public show() {
    this.shownCounter++;
    this.loading$.next(true);
  }

  public hide() {
    this.shownCounter--;
    if (this.shownCounter < 0) {
      this.shownCounter = 0;
    }
    if (this.shownCounter == 0) {
      this.loading$.next(false);
    }
  }
}
