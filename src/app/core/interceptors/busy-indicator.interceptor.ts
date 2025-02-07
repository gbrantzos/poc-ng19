import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyIndicatorService } from '@poc/core/services/busy-indicator.service';
import { finalize, Observable } from 'rxjs';

export const busyIndicatorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const service = inject(BusyIndicatorService);

  service.show();
  return next(req).pipe(finalize(() => service.hide()));
};
